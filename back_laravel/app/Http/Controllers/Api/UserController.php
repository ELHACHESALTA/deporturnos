<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use DateTime;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return $users;
    }

    public function cambiarEstadoUsuario($id){
    
        try {
            $user = User::findOrFail($id);
            if ($user->bajaUsuario === null){
                $fechaActual = new DateTime();
                $formattedDate = $fechaActual->format("Y-m-d H:i:s");
                $user->bajaUsuario= $formattedDate;
                $user->save();    
                return response()->json(['message' => 'Usuario dado de baja con éxito.', 'success' => true], 200);
            } else {
                $user->bajaUsuario = null;
                $user->save();
                return response()->json(['message' => 'Usuario dado de alta con éxito.', 'success' => true], 200);
            }
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al cambiar estado del usuario: ', 'success' => false], 500);
        }
    }
}
