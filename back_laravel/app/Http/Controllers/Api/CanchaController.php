<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Cancha;
use App\Models\GestorComplejo;
use App\Models\Complejo;
use App\Models\Deporte;
use App\Models\Servicio;
use DateTime;

class CanchaController extends Controller
{
    public function index()
    {
        $canchas = Cancha::all();
        $complejos = Complejo::all();
        $deportes = Deporte::all();
        $servicios = Servicio::all();
        return response()->json([
        'canchas' => $canchas, 
        'complejos' => $complejos, 
        'deportes' => $deportes, 
        'servicios' => $servicios]);
    }

    public function store(Request $request)
    {
        $response["success"] = false;

        $validator = Validator::make($request->all(),[
            'nombreCancha' => 'required',
            'idDeporte' => 'required',
        ]);

        if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        $cancha = new Cancha();
        $cancha->nombreCancha = $request->nombreCancha;
        $gestorComplejo = GestorComplejo::where('idUser', $request->idUser)->first();
        $complejo = Complejo::where('idGestorComplejo', $gestorComplejo->id)->first();
        $cancha->idComplejo = $complejo->id;
        $cancha->idDeporte = $request->idDeporte;
        $cancha->save();

        $response["success"] = true;
        return response()->json($response, 200);
    }

    public function show(string $id)
    {
        $cancha = Cancha::find($id);
        return $cancha;
    }

    public function update(Request $request)
    {
        $response["success"] = false;

        $validator = Validator::make($request->all(),[
            'nombreCancha' => 'required',
            'idDeporte' => 'required',
        ]);

        if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }
        
        $cancha = Cancha::where('id', $request->id)->first();
        $cancha->nombreCancha = $request->nombreCancha;
        $cancha->idDeporte = $request->idDeporte;
        $cancha->save();
        $response["success"] = true;
        return response()->json($response, 200);
    }

    public function cambiarEstadoCancha(Request $request)
    {
        try {
            $id = $request->id;
            $cancha = Cancha::findOrFail($id);
            if ($cancha->bajaCancha === null){
                $fechaActual = new DateTime();
                $formattedDate = $fechaActual->format("Y-m-d H:i:s");
                $cancha->bajaCancha = $formattedDate;
                $cancha->save();
                return response()->json(['message' => 'Cancha dada de baja con éxito.', 'success' => true], 200);
            } else {
                $cancha->bajaCancha = null;
                $cancha->save();
                return response()->json(['message' => 'Cancha dada de alta con éxito.', 'success' => true], 200);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al cambiar estado de la cancha: ', 'success' => false], 500);
        }
    }

    public function obtenerCanchas(Request $request){
        $gestorComplejo = GestorComplejo::where('idUser', $request->idUser)->first();
        $canchas = [];
        if ($gestorComplejo){
            $complejo = Complejo::where('idGestorComplejo', $gestorComplejo->id)->first();
            if ($complejo){
                $canchas = Cancha::where('idComplejo', $complejo->id)->get();
                return response()->json([
                    'complejo' => $complejo,
                    'canchas' => $canchas
                ]);
            } else {
                return response()->json(['complejo' => $complejo, 'canchas' => $canchas]); 
            }
        } else {
            return response()->json(['error' => 'Gestor no encontrado'], 404);
        }
    }
}
