<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cliente;

class ClienteController extends Controller
{
    public function obtenerCliente(Request $request){
        $cliente = Cliente::where('idUser', $request->idUsuario)->first();
        return response()->json([
            'cliente' => $cliente,
            'success' => true
        ]);
    }
}
