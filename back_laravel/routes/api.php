<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ComplejoController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CanchaController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// RUTAS PÚBLICAS
// autenticacion
Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/login', [AuthController::class, 'login']);
Route::post('/auth/check-email', [AuthController::class, 'checkEmail']);


// RUTAS PRIVADAS
Route::group(['middleware' => 'auth:sanctum'], function () {
    // autenticación
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/admin/users', [UserController::class, 'index']);

    // admin
    Route::put('/admin/cambioEstadoUsuario/{id}', [UserController::class, 'cambiarEstadoUsuario']);

    // cliente

    // gestor de complejos
    Route::post('gestorComplejo/miComplejo', [ComplejoController::class, 'mostrarComplejo']);
    Route::post('gestorComplejo/crearComplejo', [ComplejoController::class, 'store']);
    Route::put('gestorComplejo/editarComplejo', [ComplejoController::class, 'update']);
    Route::post('gestorComplejo/obtenerCanchas', [CanchaController::class, 'obtenerCanchas']);
    Route::post('gestorComplejo/crearCancha', [CanchaController::class, 'store']);
});