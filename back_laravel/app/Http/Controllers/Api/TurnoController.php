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

    public function crearTurnoAutomatico(){

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
}
