<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ComplejoServicio;

class ComplejoServiciosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $complejoServicio1 = new ComplejoServicio();
        $complejoServicio1->idServicio = 2;
        $complejoServicio1->idComplejo = 1;
        $complejoServicio1->save();

        $complejoServicio2 = new ComplejoServicio();
        $complejoServicio2->idServicio = 3;
        $complejoServicio2->idComplejo = 1;
        $complejoServicio2->save();

        $complejoServicio3 = new ComplejoServicio();
        $complejoServicio3->idServicio = 1;
        $complejoServicio3->idComplejo = 2;
        $complejoServicio3->save();

        $complejoServicio4 = new ComplejoServicio();
        $complejoServicio4->idServicio = 2;
        $complejoServicio4->idComplejo = 2;
        $complejoServicio4->save();

        $complejoServicio5 = new ComplejoServicio();
        $complejoServicio5->idServicio = 3;
        $complejoServicio5->idComplejo = 2;
        $complejoServicio5->save();

        $complejoServicio6 = new ComplejoServicio();
        $complejoServicio6->idServicio = 3;
        $complejoServicio6->idComplejo = 3;
        $complejoServicio6->save();

        $complejoServicio7 = new ComplejoServicio();
        $complejoServicio7->idServicio = 1;
        $complejoServicio7->idComplejo = 4;
        $complejoServicio7->save();

        $complejoServicio8 = new ComplejoServicio();
        $complejoServicio8->idServicio = 3;
        $complejoServicio8->idComplejo = 4;
        $complejoServicio8->save();

        $complejoServicio9 = new ComplejoServicio();
        $complejoServicio9->idServicio = 3;
        $complejoServicio9->idComplejo = 5;
        $complejoServicio9->save();

        $complejoServicio10 = new ComplejoServicio();
        $complejoServicio10->idServicio = 1;
        $complejoServicio10->idComplejo = 6;
        $complejoServicio10->save();

        $complejoServicio11 = new ComplejoServicio();
        $complejoServicio11->idServicio = 2;
        $complejoServicio11->idComplejo = 6;
        $complejoServicio11->save();

        $complejoServicio12 = new ComplejoServicio();
        $complejoServicio12->idServicio = 3;
        $complejoServicio12->idComplejo = 6;
        $complejoServicio12->save();

        $complejoServicio13 = new ComplejoServicio();
        $complejoServicio13->idServicio = 2;
        $complejoServicio13->idComplejo = 7;
        $complejoServicio13->save();

        $complejoServicio14 = new ComplejoServicio();
        $complejoServicio14->idServicio = 3;
        $complejoServicio14->idComplejo = 7;
        $complejoServicio14->save();
    }
}
