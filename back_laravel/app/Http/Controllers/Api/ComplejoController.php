<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Complejo;
use App\Models\GestorComplejo;
use App\Models\Dia;
use App\Models\Servicio;
use App\Models\ComplejoServicio;
use App\Models\Resenia;
use App\Models\Cancha;
use App\Models\Favorito;
use App\Models\Deporte;
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
        $gestor = GestorComplejo::where('idUser', $request->idUser)->first();
        $complejo->idGestorComplejo = $gestor->id;

        $complejo->save();
        $idComplejo = $complejo->id;

        // Creación del día según el arreglo de dias disponible obtenido
        $diasConfiguracion = $request->input('diasConfiguracion');
        foreach ($diasConfiguracion as $dia => $configuracion) {
            $abierto = $configuracion['abierto'];
            $apertura = $configuracion['apertura'] . ":00";
            $cierre = $configuracion['cierre'] . ":00";
            if ($abierto) {
                $objDia = new Dia();
                $objDia->dia = $dia;
                $objDia->horaApertura = $apertura;
                $objDia->horaCierre = $cierre;
                $objDia->idComplejo = $idComplejo;
                $objDia->save();
            }
        }

        // Creación de ComplejoServicio según el arreglo de servicios
        $servicios = $request->input('selectedServices');
        foreach($servicios as $servicio){
            $idServicio = $servicio['id'];
            $seleccionado = $servicio['seleccionado'];
            if ($seleccionado) {
                $objComplejoServicio = new ComplejoServicio();
                $objComplejoServicio->idServicio = $idServicio;
                $objComplejoServicio->idComplejo = $idComplejo;
                $objComplejoServicio->save();
            }
        }

        $response["success"] = true;
        return response()->json($response, 200);
    }

    public function show($id)
    {
        $complejo = Complejo::find($id);
        if ($complejo){
            $response["complejo"] = $complejo;
            $response["complejoServicios"] = ComplejoServicio::where('idComplejo', $complejo->id)->get();
            $response["servicios"] = Servicio::all();
            $response["resenias"] = Resenia::where('idComplejo', $complejo->id)->get();
            $response["canchasComplejo"] = Cancha::where('idComplejo', $complejo->id)->get();
            $response["deportes"] = Deporte::all();
            $response["diasComplejo"] = Dia::where('idComplejo', $complejo->id)->get();
            $response["favoritosComplejo"] = Favorito::where('idComplejo', $complejo->id)->get();
        } else {
            $response["message"] = "Complejo no encontrado";
        }
        return response()->json($response, 200);
    }

    public function update(Request $request)
    {
        $response["success"] = false;

        $validator = Validator::make($request->all(),[
            'nombreComplejo' => 'required',
            'ciudad' => 'required',
            'ubicacion' => 'required',
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
        $complejo->idGestorComplejo = $gestor->id;
        $complejo->save();


        // Edición de días y horarios disponibles
        $diasConfiguracion = $request->input('diasConfiguracion');
        
        // Se obtienen los días existentes en la base de datos
        $diasExistentes = Dia::where('idComplejo', $complejo->id)->get()->keyBy('dia');
        
        foreach ($diasConfiguracion as $dia => $configuracion) {
            $abierto = $configuracion['abierto'];
            $apertura = $configuracion['apertura'];
            $cierre = $configuracion['cierre'];
    
            if ($abierto) {
                // Si el día ya existe, actualiza
                if (isset($diasExistentes[$dia])) {
                    $diaExistente = $diasExistentes[$dia];
                    $diaExistente->horaApertura = $apertura;
                    $diaExistente->horaCierre = $cierre;
                    $diaExistente->save();
                } else {
                    // Si el día no existe, crea uno nuevo
                    $nuevoDia = new Dia();
                    $nuevoDia->dia = $dia;
                    $nuevoDia->horaApertura = $apertura;
                    $nuevoDia->horaCierre = $cierre;
                    $nuevoDia->idComplejo = $complejo->id;
                    $nuevoDia->save();
                }
            } else {
                // Si el día no está abierto y existe en la base de datos, se elimina el registro
                if (isset($diasExistentes[$dia])) {
                    $diasExistentes[$dia]->delete();
                }
            }
        }

        // Edición de servicios
        $serviciosEstado = $request->input('serviciosEstado');
        $serviciosActuales = ComplejoServicio::where('idComplejo', $complejo->id)->pluck('idServicio')->toArray();
        $serviciosSeleccionados = array_filter($serviciosEstado, function($servicio){
            return $servicio['seleccionado'];
        });

        $serviciosSeleccionadosIds = array_column($serviciosSeleccionados, 'id');
        $nuevosServicios = array_diff($serviciosSeleccionadosIds, $serviciosActuales);
        foreach ($nuevosServicios as $idServicio) {
            $nuevoComplejoServicio = new ComplejoServicio();
            $nuevoComplejoServicio->idServicio = $idServicio;
            $nuevoComplejoServicio->idComplejo = $complejo->id;
            $nuevoComplejoServicio->save();
        }

        $serviciosParaEliminar = array_diff($serviciosActuales, $serviciosSeleccionadosIds);
        ComplejoServicio::where('idComplejo', $complejo->id)
            ->whereIn('idServicio', $serviciosParaEliminar)
            ->delete();


        $response["success"] = true;
        return response()->json($response, 200);
    }

    public function destroy(string $id)
    {
        $complejo = Complejo::destroy($id);
        return $complejo;
    }

    public function mostrarComplejo(Request $request){
        $servicios = Servicio::all();
        if (count($servicios) == 0){
            $servicios = [];
        }
        $gestorComplejo = GestorComplejo::where('idUser', $request->idUser)->first();
        if ($gestorComplejo) {
            $complejo = Complejo::where('idGestorComplejo', $gestorComplejo->id)->get();
            if (count($complejo) > 0){
                $diasDisponibles = Dia::where('idComplejo', $complejo[0]->id)->get();
                $serviciosSeleccionados = ComplejoServicio::where('idComplejo', $complejo[0]->id)->get();
                return response()->json(['complejo' => $complejo, 'diasDisponibles' => $diasDisponibles, 'servicios' => $servicios, 'serviciosSeleccionados' => $serviciosSeleccionados]);
            } else {
                return response()->json(['complejo' => $complejo, 'diasDisponibles' => [], 'servicios' => $servicios]);
            }
            
        } else {
            return response()->json(['error' => 'Gestor no encontrado'], 404);
        }
    }
}
