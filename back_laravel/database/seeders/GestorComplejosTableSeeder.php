<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\GestorComplejo;

class GestorComplejosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $gestor1 = new GestorComplejo();
        $gestor1->idUser = 3;
        $gestor1->save();

        $gestor2 = new GestorComplejo();
        $gestor2->idUser = 6;
        $gestor2->save();

        $gestor3 = new GestorComplejo();
        $gestor3->idUser = 7;
        $gestor3->save();

        $gestor4 = new GestorComplejo();
        $gestor4->idUser = 8;
        $gestor4->save();

        $gestor5 = new GestorComplejo();
        $gestor5->idUser = 9;
        $gestor5->save();

        $gestor6 = new GestorComplejo();
        $gestor6->idUser = 10;
        $gestor6->save();

        $gestor7 = new GestorComplejo();
        $gestor7->idUser = 11;
        $gestor7->save();

        $gestor8 = new GestorComplejo();
        $gestor8->idUser = 12;
        $gestor8->save();
    }
}
