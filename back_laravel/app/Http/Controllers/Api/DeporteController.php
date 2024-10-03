<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Deporte;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DeporteController extends Controller
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
            'nombreDeporte' => 'required',
            'tipoDeporte' => 'required',
            'duracionTurno' => 'required',
        ]);

        if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        $deporte = new Deporte();
        $deporte->nombreDeporte = $request->nombreDeporte;
        $deporte->tipoDeporte = $request->tipoDeporte;
        $deporte->duracionTurno = $request->duracionTurno;
        $deporte->save();
        $response["success"] = true;
        return response()->json($response, 200);
    }

    public function show(string $id)
    {
        // $complejo = Complejo::find($id);
        // return $complejo;
    }

    public function update(Request $request)
    {
        $response["success"] = false;

        $validator = Validator::make($request->all(),[
            'nombreDeporte' => 'required',
            'tipoDeporte' => 'required',
            'duracionTurno' => 'required',
        ]);

        if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }
        $deporte = Deporte::where('id', $request->id)->first();
        $deporte->nombreDeporte = $request->nombreDeporte;
        $deporte->tipoDeporte = $request->tipoDeporte;
        $deporte->duracionTurno = $request->duracionTurno;
        $deporte->save();

        $response["success"] = true;
        return response()->json($response, 200);
    }

    public function destroy(string $id)
    {
        $deporte = Deporte::destroy($id);
        return $deporte;
    }
}
