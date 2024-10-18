<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Turno;
use App\Models\GestorComplejo;
use App\Models\Complejo;
use App\Models\Cancha;

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
