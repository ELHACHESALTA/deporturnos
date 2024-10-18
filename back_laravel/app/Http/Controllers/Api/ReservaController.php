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
use Carbon\Carbon;

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

    public function buscarTurnoPeriodico(Request $request) {
        $response["success"] = false;

        $validator = Validator::make($request->all(),[
            'idTurno' => 'required',
            'idCliente' => 'required',
            'cantSemanas' => 'required',
        ]);

        if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        $turno = Turno::where("id", $request->idTurno)->first();
        $fechaTurno = $turno->horarioInicio;
        $carbonFecha = Carbon::parse($fechaTurno);
        $diaSemana = $carbonFecha->locale('en')->isoFormat('dddd');

        // Bucle de cantidad de semanas

        $arregloTurnosPeriodicos = [];
        for ($i=1; $i<$request -> cantSemanas; $i++) {
            $carbonFecha -> addDays(7);
            $fechaAComparar = $carbonFecha -> toDateTimeString();
            $turnoNuevo = Turno::where("idCancha", $turno -> idCancha) -> where("horarioInicio", $fechaAComparar) -> where("estadoDisponible", "disponible")->first();
            if($turnoNuevo) {
                array_push($arregloTurnosPeriodicos, $turnoNuevo);
            } else {
                array_push($arregloTurnosPeriodicos, $fechaAComparar);
            }
        }
        // Bucle de cantidad de semanas

        $response["arregloTurnosPeriodicos"] = $arregloTurnosPeriodicos;
        $response["success"] = true;
        return response()->json($response, 200);
    }

    public function reservarTurnoPeriodico(Request $request){
        $response["success"] = false;

        $validator = Validator::make($request->all(),[
            'idTurno' => 'required',
            'idCliente' => 'required',
            'arregloTurnosPeriodicos' => 'required',
        ]);

        if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        $reserva = new Reserva();
        $reserva->idTurno = $request->idTurno;
        $cliente = Cliente::where('id', $request->idCliente)->first();
        $reserva->idCliente = $cliente->id;
        $reserva->esPeriodica = true;
        $reserva->patronPeriodico = "";
        $reserva->save();

        for($i=0;$i<count($request->arregloTurnosPeriodicos);$i++) {
            if(is_string($request->arregloTurnosPeriodicos[$i])) {
                $response["error"] = "Hubo un error al cargar las reservas periodicas";
            } else {
                $turno = Turno::where("id", $request->arregloTurnosPeriodicos[$i]["id"])->first();
                $turno->estadoDisponible = "no disponible";
                $turno->save();

                $reserva = new Reserva();
                $reserva->idTurno = $request->arregloTurnosPeriodicos[$i]["id"];
                $cliente = Cliente::where('id', $request->idCliente)->first();
                $reserva->idCliente = $cliente->id;
                $reserva->esPeriodica = true;
                $reserva->patronPeriodico = "";
                $reserva->save();
            }
        }

        $response["success"] = true;
        return response()->json($response, 200);
    }

    public function reprogramarReserva(Request $request){
        $response["success"] = false;

        $validator = Validator::make($request->all(),[
            'idTurnoADescartar' => 'required',
            'idTurnoNuevo' => 'required',
            'idCliente' => 'required',
        ]);

        if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        $turnoADescartar = Turno::where('id', $request->idTurnoADescartar)->first();
        $turnoADescartar->estadoDisponible = "disponible";
        $turnoADescartar->save();

        $turnoNuevo = Turno::where('id', $request->idTurnoNuevo)->first();
        $turnoNuevo->estadoDisponible = "no disponible";
        $turnoNuevo->save();

        $reservaADescartar = Reserva::where('idTurno', $request->idTurnoADescartar)->first();
        $esPeriodicaADescartar = $reservaADescartar->esPeriodica;
        $patronPeriodicoADescartar = $reservaADescartar->patronPeriodico;
        $reservaADescartar->delete();

        $reservaNueva = new Reserva();
        $reservaNueva->idTurno = $request->idTurnoNuevo;
        $reservaNueva->idCliente = $request->idCliente;
        $reservaNueva->esPeriodica = $esPeriodicaADescartar;
        $reservaNueva->patronPeriodico = $patronPeriodicoADescartar;
        $reservaNueva->save();

        $response["success"] = true;
        $response["message"] = "Se realizó la reprogramacion con exito!";
        return response()->json($response, 200);
    }
}
