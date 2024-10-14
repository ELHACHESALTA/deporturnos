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

        $cliente2 = new Cliente();
        $cliente2->idUser = 4;
        $cliente2->urlFotoPerfil = null;
        $cliente2->save();

        $cliente3 = new Cliente();
        $cliente3->idUser = 5;
        $cliente3->urlFotoPerfil = null;
        $cliente3->save();
    }
}
