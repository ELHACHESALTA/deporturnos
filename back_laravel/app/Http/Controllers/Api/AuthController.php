<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Administrador;
use App\Models\Cliente;
use App\Models\GestorComplejo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        return response()->json($response, 200);
    }

    public function login(Request $request){
        $response = ["success" => false];
        // validacion
        $validator = Validator::make($request->all(),[
            'email' => 'required',
            'password' => 'required',
        ]);

        if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $response["token"] = $user->createToken("token")->plainTextToken;
            $response["user"] = $user;
            $response["success"] = true;
            $response["message"] = "Logueado";
        } else {
            $response["error"] = "Credenciales inválidas";
        }
        return response()->json($response, 200);
    }

    public function logout(){
        $response["success"] = false;
        Auth::user()->tokens()->delete();
        $response=["success" => true, "message" => "Sesión cerrada"];
        return response()->json($response, 200);
    }
}
