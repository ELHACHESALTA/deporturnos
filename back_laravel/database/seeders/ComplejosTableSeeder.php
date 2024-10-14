<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Complejo;

class ComplejosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $complejo1 = new Complejo();
        $complejo1->nombreComplejo = "Complejo Q";
        $complejo1->ciudad = "Neuquén";
        $complejo1->ubicacion = "La Plata 550";
        $complejo1->idGestorComplejo = 1;
        $complejo1->save();

        $complejo2 = new Complejo();
        $complejo2->nombreComplejo = "Orsai";
        $complejo2->ciudad = "Neuquén";
        $complejo2->ubicacion = "Av Olascoaga 2000";
        $complejo2->idGestorComplejo = 3;
        $complejo2->save();

        $complejo3 = new Complejo();
        $complejo3->nombreComplejo = "Costa Pádel Club";
        $complejo3->ciudad = "Neuquén";
        $complejo3->ubicacion = "Rio Senguer 731";
        $complejo3->idGestorComplejo = 4;
        $complejo3->save();

        $complejo4 = new Complejo();
        $complejo4->nombreComplejo = "Somos Padel Cipolletti";
        $complejo4->ciudad = "Cipolletti";
        $complejo4->ubicacion = "25 de Mayo 311";
        $complejo4->idGestorComplejo = 5;
        $complejo4->save();

        $complejo5 = new Complejo();
        $complejo5->nombreComplejo = "La Red Futbol 5";
        $complejo5->ciudad = "General Roca";
        $complejo5->ubicacion = "Viedma 1341";
        $complejo5->idGestorComplejo = 6;
        $complejo5->save();

        $complejo6 = new Complejo();
        $complejo6->nombreComplejo = "Stylo Padel";
        $complejo6->ciudad = "General Roca";
        $complejo6->ubicacion = "España 835";
        $complejo6->idGestorComplejo = 7;
        $complejo6->save();

        $complejo7 = new Complejo();
        $complejo7->nombreComplejo = "CIF";
        $complejo7->ciudad = "Cipolletti";
        $complejo7->ubicacion = "Maestro Don Juan Espinosa 349";
        $complejo7->idGestorComplejo = 8;
        $complejo7->save();
    }
}
