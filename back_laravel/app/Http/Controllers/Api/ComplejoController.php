<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Complejo;
use App\Models\GestorComplejo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ComplejoController extends Controller
{
    public function index()
    {
        $complejos = Complejo::all();
        return $complejos;
    }

    public function store(Request $request)
    {
        $response["success"] = false;

        $validator = Validator::make($request->all(),[
            'nombreComplejo' => 'required',
            'ciudad' => 'required',
            'ubicacion' => 'required',
            'diasDisponibles' => 'required',
            'horaApertura' => 'required',
            'horaCierre' => 'required',
            'idUser' => 'required',
        ]);

        if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        $complejo = new Complejo();
        $complejo->nombreComplejo = $request->nombreComplejo;
        $complejo->ciudad = $request->ciudad;
        $complejo->ubicacion = $request->ubicacion;
        $complejo->diasDisponibles = $request->diasDisponibles;
        $complejo->horaApertura = $request->horaApertura;
        $complejo->horaCierre = $request->horaCierre;
        $gestor = GestorComplejo::where('idUser', $request->idUser)->first();
        $complejo->idGestorComplejo = $gestor->id;

        $complejo->save();
        $response["success"] = true;
        return response()->json($response, 200);
    }

    public function show(string $id)
    {
        $complejo = Complejo::find($id);
        return $complejo;
    }

    public function update(Request $request)
    {
        $response["success"] = false;

        $validator = Validator::make($request->all(),[
            'nombreComplejo' => 'required',
            'ciudad' => 'required',
            'ubicacion' => 'required',
            'diasDisponibles' => 'required',
            'horaApertura' => 'required',
            'horaCierre' => 'required',
            'idUser' => 'required',
        ]);

        if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }
        $gestor = GestorComplejo::where('idUser', $request->idUser)->first();
        $complejo = Complejo::where('idGestorComplejo', $gestor->id)->first();
        $complejo->nombreComplejo = $request->nombreComplejo;
        $complejo->ciudad = $request->ciudad;
        $complejo->ubicacion = $request->ubicacion;
        $complejo->diasDisponibles = $request->diasDisponibles;
        $complejo->horaApertura = $request->horaApertura;
        $complejo->horaCierre = $request->horaCierre;
        $complejo->idGestorComplejo = $gestor->id;

        $complejo->save();
        $response["success"] = true;
        return response()->json($response, 200);
    }

    public function destroy(string $id)
    {
        $complejo = Complejo::destroy($id);
        return $complejo;
    }

    public function mostrarComplejo(Request $request){
        $gestorComplejo = GestorComplejo::where('idUser', $request->idUser)->first();
        if ($gestorComplejo) {
            $complejo = Complejo::where('idGestorComplejo', $gestorComplejo->id)->get();
            return response()->json($complejo);
        } else {
            return response()->json(['error' => 'Gestor no encontrado'], 404);
        }
    }
}
