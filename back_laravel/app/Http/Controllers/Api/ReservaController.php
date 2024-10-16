<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reserva;
use App\Models\Cliente;
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
}
