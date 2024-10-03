<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Cancha;
use App\Models\GestorComplejo;
use App\Models\Complejo;

class CanchaController extends Controller
{
    public function index()
    {
        // $complejos = Complejo::all();
        // return $complejos;
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

    public function destroy(string $id)
    {
        $cancha = Cancha::destroy($id);
        return $cancha;
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
