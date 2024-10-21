<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Turno;
use App\Models\GestorComplejo;
use App\Models\Complejo;
use App\Models\Cancha;
use App\Models\Deporte;
use Carbon\Carbon;
use App\Models\Dia;

class TurnoController extends Controller
{
    public function crearTurno(Request $request)
    {
        $response["success"] = false;

        $validator = Validator::make($request->all(),[
            'idCancha' => 'required',
            'horarioInicio' => 'required',
            'horarioFin' => 'required',
            'precio' => 'required',
            'timerReprogramacion' => 'required',
        ]);

        if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        $turno = new Turno();
        $turno->idCancha = $request->idCancha;
        $turno->horarioInicio = $request->horarioInicio;
        $turno->horarioFin = $request->horarioFin;
        $turno->estadoDisponible = "disponible";
        $turno->metodoPago = "mercado pago";
        $turno->timerPago = "00:05:00";
        $turno->timerReprogramacion = $request->timerReprogramacion;
        $turno->precio = $request->precio;
        $turno->save();
        $response["success"] = true;
        return response()->json($response, 200);
    }

    public function crearTurnoAutomatico(Request $request){
        $response["success"] = false;

        $validator = Validator::make($request->all(),[
            'fechaInicioTurnos' => 'required',
            'fechaFinTurnos' => 'required',
            'precio' => 'required',
            'timerReprogramacion' => 'required',
            'idCancha' => 'required',
        ]);

        if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        // se obtienen las fechas de inicio y fin de generación de turnos en formato Carbon
        $fechaInicio = Carbon::parse($request->fechaInicioTurnos);
        $fechaFin = Carbon::parse($request->fechaFinTurnos);

        // se buscan los días en los que se encuentra abierto el complejo al que pertenece la cancha
        $cancha = Cancha::where('id', $request->idCancha)->first();
        $diasAbiertosComplejo = Dia::where('idComplejo', $cancha->idComplejo)->get();

        // se obtiene el deporte de la cancha
        $deporte = Deporte::where('id', $cancha->idDeporte)->first();

        $duracionTurnoString = $deporte->duracionTurno;
        $duracionCarbon = Carbon::createFromFormat('H:i:s', $duracionTurnoString);
        $duracionTurno = ($duracionCarbon->hour * 60) + $duracionCarbon->minute;
        
        // se recorren las fechas entre el rango de inicio y fin recibidas por parametro
        for($fecha = $fechaInicio; $fecha->lte($fechaFin); $fecha->addDay()){
            // se obtiene el nombre del dia
            $nombreDia = ucfirst($fecha->locale('es')->dayName);
            $diaAbierto = $diasAbiertosComplejo->where('dia', $nombreDia)->first();
            if($diaAbierto){
                $horaAperturaDia = Carbon::parse($fecha->toDateString() . ' ' . $diaAbierto->horaApertura);
                $horaCierreDia = Carbon::parse($fecha->toDateString() . ' ' . $diaAbierto->horaCierre);
                while($horaAperturaDia->lt($horaCierreDia)){
                    $horaFinTurno = $horaAperturaDia->copy()->addMinutes($duracionTurno);
                    if($horaFinTurno->lte($horaCierreDia)){
                        $turnoExistente = Turno::where('idCancha', $request->idCancha)
                        ->where('horarioInicio', '<', $horaFinTurno->toDateTimeString())
                        ->where('horarioFin', '>', $horaAperturaDia->toDateTimeString())
                        ->exists();
                        if(!$turnoExistente){
                            $nuevoTurno = new Turno();
                            $nuevoTurno->idCancha = $request->idCancha;
                            $nuevoTurno->horarioInicio = $horaAperturaDia->toDateTimeString();
                            $nuevoTurno->horarioFin = $horaFinTurno->toDateTimeString();
                            $nuevoTurno->estadoDisponible = 'disponible';
                            $nuevoTurno->metodoPago = 'mercado pago';
                            $nuevoTurno->timerPago = '00:05:00';
                            $nuevoTurno->timerReprogramacion = $request->timerReprogramacion;
                            $nuevoTurno->precio = $request->precio;
                            $nuevoTurno->save();
                        }
                    }
                    $horaAperturaDia->addMinutes($duracionTurno);
                }
            }
        }
        $response["success"] = true;
        return response()->json($response, 200);
    }

    public function editarTurno(Request $request){
        $response["success"] = false;

        $validator = Validator::make($request->all(),[
            'horarioInicio' => 'required',
            'horarioFin' => 'required',
            'precio' => 'required',
            'timerReprogramacion' => 'required',
        ]);

        if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        $turno = Turno::where('id', $request->id)->first();
        $turno->horarioInicio = $request->horarioInicio;
        $turno->horarioFin = $request->horarioFin;
        $turno->timerReprogramacion = $request->timerReprogramacion;
        $turno->precio = $request->precio;
        $turno->save();
        $response["success"] = true;
        return response()->json($response, 200);
    }

    public function eliminarTurno($id){
        $response["success"] = false;
        $turno = Turno::findOrFail($id);
        if($turno){
            $turno->delete();
            $response["success"] = true;
        } else {
            $response["message"] = "Turno no encontrado.";
        }
        return response()->json($response, 200);
    }

    public function obtenerCanchasYTurnos (Request $request){
        $gestorComplejo = GestorComplejo::where('idUser', $request->idUser)->first();
        $canchas = [];
        $turnos = [];
        if ($gestorComplejo){
            $complejo = Complejo::where('idGestorComplejo', $gestorComplejo->id)->first();
            if ($complejo){
                $canchas = Cancha::where('idComplejo', $complejo->id)->get();
                if ($canchas){
                    $idCanchas = $canchas->pluck('id');
                    $turnos = Turno::whereIn('idCancha', $idCanchas)->get();
                    return response()->json([
                        'complejo' => $complejo,
                        'canchas' => $canchas,
                        'turnos' => $turnos
                    ]);
                } else {
                    return response()->json([
                        'complejo' => $complejo,
                        'canchas' => $canchas,
                        'turnos' => $turnos
                    ]);
                }
                
            } else {
                return response()->json(['complejo' => $complejo, 'canchas' => $canchas, 'turnos' => $turnos]); 
            }
        } else {
            return response()->json(['error' => 'Gestor no encontrado'], 404);
        }
    }

    public function cambiarEstadoTurno($id){
        $turno = Turno::findOrFail($id);
        if ($turno){
            if ($turno->estadoDisponible === "disponible"){
                $turno->estadoDisponible = "no disponible";
                $turno->save();
                return response()->json(['message' => 'Turno cambiado de estado correctamente.', 'success' => true], 200);
            } else if ($turno->estadoDisponible === "no disponible"){
                $turno->estadoDisponible = "disponible";
                $turno->save();
                return response()->json(['message' => 'Turno cambiado de estado correctamente.', 'success' => true], 200);
            } else {
                return response()->json(['message' => 'No se ha podido modificar el turno.', 'success' => false], 200);
            }
        } else {
            return response()->json(['error' => 'No se ha encontrado ningún turno.', 'success' => false], 500);
        }
        
    }
}
