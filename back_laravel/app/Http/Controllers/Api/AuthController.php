<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Administrador;
use App\Models\Cliente;
use App\Models\GestorComplejo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request){
        // validacion
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
            'idRol' => 'required',
        ]);

        if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        $response = ["success" => false];
        $input = $request->all();
        $input["password"] = bcrypt($input["password"]);
        $input["idRol"] = (int)$input["idRol"];

        $user = User::create($input);
        $response["message"] = "El usuario fue creado exitosamente!";
        $response["success"] = true;
        $response["user"] = $user;
        if ($user->idRol == 1){
            $datos["idUser"] = $user->id;
            $administrador = Administrador::create($datos);
            $response["herencia"] = $administrador;
        } elseif($user->idRol == 2){
            $datos["idUser"] = $user->id;
            $cliente = Cliente::create($datos);
            $response["herencia"] = $cliente;
        } elseif($user->idRol == 3){
            // codigo para gestorComplejo
            $datos["idUser"] = $user->id;
            $gestorComplejo = GestorComplejo::create($datos);
            $response["herencia"] = $gestorComplejo;
        }
        //$response["token"] = $user->createToken("Token")->plainTextToken;
        return response()->json($response, 200);
    }

}
