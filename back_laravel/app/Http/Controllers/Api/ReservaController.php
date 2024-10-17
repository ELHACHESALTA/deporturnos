<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reserva;
use App\Models\Cliente;
use App\Models\Turno;
use App\Models\Cancha;
use App\Models\Complejo;
use App\Models\Deporte;
use Illuminate\Support\Facades\Validator;

class ReservaController extends Controller
{
    public function reservarTurno(Request $request){
        $response["success"] = false;

        $validator = Validator::make($request->all(),[
            'idTurno' => 'required',
            'idCliente' => 'required',
        ]);

        if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        $reserva = new Reserva();
        $reserva->idTurno = $request->idTurno;
        $cliente = Cliente::where('id', $request->idCliente)->first();
        $reserva->idCliente = $cliente->id;
        $reserva->esPeriodica = false;
        $reserva->patronPeriodico = "";
        $reserva->save();
        $response["success"] = true;
        return response()->json($response, 200);
    }

    public function obtenerReservasCliente(Request $request){
        $response["success"] = false;
        $cliente = Cliente::where('idUser', $request->idUsuario)->first();
        $reservasCliente = Reserva::where('idCliente', $cliente->id)->get();
        $turnos = Turno::whereIn('id', $reservasCliente->pluck('idTurno'))->get();
        $canchas = Cancha::whereIn('id', $turnos->pluck('idCancha'))->get();
        $complejos = Complejo::whereIn('id', $canchas->pluck('idComplejo'))->get();
        $deportes = Deporte::whereIn('id', $canchas->pluck('idDeporte'))->get();
        $response["reservasCliente"] = $reservasCliente;
        $response["turnos"] = $turnos;
        $response["canchas"] = $canchas;
        $response["complejos"] = $complejos;
        $response["deportes"] = $deportes;
        $response["success"] = true;
        return response()->json($response, 200);
    }
}
