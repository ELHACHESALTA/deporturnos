<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cliente;

class ClientesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cliente1 = new Cliente();
        $cliente1->idUser = 2;
        $cliente1->urlFotoPerfil = null;
        $cliente1->save();
    }
}
