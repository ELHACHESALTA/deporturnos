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
    }
}
