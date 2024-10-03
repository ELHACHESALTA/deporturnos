<?php

namespace Database\Seeders;

use App\Models\Deporte;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DeportesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $deporte1 = new Deporte;
        $deporte1->nombreDeporte = "futbol";
        $deporte1->tipoDeporte = "f5";
        $deporte1->duracionTurno = "01:00:00";
        $deporte1->save();

        $deporte2 = new Deporte;
        $deporte2->nombreDeporte = "futbol";
        $deporte2->tipoDeporte = "f8";
        $deporte2->duracionTurno = "01:00:00";
        $deporte2->save();

        $deporte3 = new Deporte;
        $deporte3->nombreDeporte = "futbol";
        $deporte3->tipoDeporte = "f11";
        $deporte3->duracionTurno = "01:00:00";
        $deporte3->save();

        $deporte4 = new Deporte;
        $deporte4->nombreDeporte = "padel";
        $deporte4->tipoDeporte = "";
        $deporte4->duracionTurno = "01:30:00";
        $deporte4->save();
    }
}
