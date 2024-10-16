<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ComplejoController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CanchaController;
use App\Http\Controllers\Api\TurnoController;
use App\Http\Controllers\Api\FavoritoController;
use App\Http\Controllers\Api\ClienteController;

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
    Route::get('/cliente/verCanchas', [CanchaController::class, 'index']);
    Route::get('cliente/cancha/{id}', [CanchaController::class, 'show']);
    Route::post('cliente/agregarFavorito', [FavoritoController::class, 'agregarFavorito']);
    Route::post('cliente/eliminarFavorito', [FavoritoController::class, 'eliminarFavorito']);
    Route::post('cliente/obtenerCliente', [ClienteController::class, 'obtenerCliente']);

    // gestor de complejos
    Route::post('gestorComplejo/miComplejo', [ComplejoController::class, 'mostrarComplejo']);
    Route::post('gestorComplejo/crearComplejo', [ComplejoController::class, 'store']);
    Route::put('gestorComplejo/editarComplejo', [ComplejoController::class, 'update']);
    Route::post('gestorComplejo/obtenerCanchas', [CanchaController::class, 'obtenerCanchas']);
    Route::post('gestorComplejo/crearCancha', [CanchaController::class, 'store']);
    Route::put('gestorComplejo/editarCancha', [CanchaController::class, 'update']);
    Route::put('gestorComplejo/cambiarEstadoCancha', [CanchaController::class, 'cambiarEstadoCancha']);
    Route::post('gestorComplejo/crearTurno', [TurnoController::class, 'crearTurno']);
    Route::post('gestorComplejo/obtenerCanchasYTurnos', [TurnoController::class, 'obtenerCanchasYTurnos']);
    Route::put('gestorComplejo/editarTurno', [TurnoController::class, 'editarTurno']);
    Route::delete('gestorComplejo/eliminarTurno/{id}', [TurnoController::class, 'eliminarTurno']);
});