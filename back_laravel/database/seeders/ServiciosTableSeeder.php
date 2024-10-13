<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Servicio;

class ServiciosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $servicio1 = new Servicio;
        $servicio1->descripcionServicio = "Estacionamiento";
        $servicio1->save();

        $servicio2 = new Servicio;
        $servicio2->descripcionServicio = "Buffet";
        $servicio2->save();

        $servicio3 = new Servicio;
        $servicio3->descripcionServicio = "Baños";
        $servicio3->save();
    }
}
