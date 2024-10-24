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
use Tymon\JWTAuth\Facades\JWTAuth;

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

        $input = $request->all();
        $input["password"] = bcrypt($input["password"]);
        $input["idRol"] = (int)$input["idRol"];
        
        $user = User::create($input);

        $token = JWTAuth::fromUser($user);
        
        if ($user->idRol == 1){
            Administrador::create(["idUser" => $user->id]);
        } elseif ($user->idRol == 2) {
            Cliente::create(["idUser" => $user->id]);
        } elseif ($user->idRol == 3) {
            GestorComplejo::create(["idUser" => $user->id]);
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Usuario registrado exitosamente',
            'user' => $user,
        ], 200);
    }

    public function login(Request $request) {
        $response["success"] = false;
        // Validación
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors()
            ], 200);
        }
    
        $credentials = $request->only('email', 'password');
    
        // Se intenta autenticar y obtener el token
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['success' => false, 'error' => 'Unauthorized'], 200);
        }
    
        $user = JWTAuth::user();
    
        // Se crea un array con los datos del usuario para incluir en el token
        $customClaims = [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,       
                'email' => $user->email,     
                'idRol' => $user->idRol,     
            ]
        ];
    
        // Generar el token con reclamos personalizados
        $token = JWTAuth::claims($customClaims)->fromUser($user);
    
        return response()->json([
            'token' => $token,
            'success' => true
        ], 200);
    }
    
    

    public function logout(){
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json(['success' => true, 'message' => 'Sesión cerrada correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al cerrar sesión'], 200);
        }
    }

    public function checkEmail (Request $request){
        $email = $request->input('email');
        $exists = User::where('email', $email)->exists();
        return response()->json(['exists' => $exists]);
    }
}
