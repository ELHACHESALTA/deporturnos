<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Favorito;
use App\Models\Complejo;
use App\Models\Cliente;
use Illuminate\Support\Facades\Validator;

class FavoritoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Favorito $favorito)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Favorito $favorito)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Favorito $favorito)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Favorito $favorito)
    {
        //
    }

    function agregarFavorito(Request $request){
        $response["success"] = false;

        $validator = Validator::make($request->all(),[
            'idUsuario' => 'required',
            'idComplejo' => 'required',
        ]);

        if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        $cliente = Cliente::where('idUser', $request->idUsuario)->first();

        $favorito = new Favorito();
        $favorito->idCliente = $cliente->id;
        $favorito->idComplejo = $request->idComplejo;
        $favorito->save();
        $response["success"] = true;
        return response()->json($response, 200);
    }

    public function eliminarFavorito(Request $request){
        $response["success"] = false;
        $favorito = Favorito::where('idCliente', $request->idCliente)->where('idComplejo', $request->idComplejo);
        $favorito->delete();
        $response["success"] = true;
        return response()->json($response, 200);
    }
}
