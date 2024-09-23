<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Administrador;

class AdministradorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $administrador1 = new Administrador;
        $administrador1->idUser = 1;
        $administrador1->save();
    }
}
