<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Reserva;

class ReservasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reserva1 = new Reserva();
        $reserva1->idTurno = 1;
        $reserva1->idCliente = 1;
        $reserva1->esPeriodica = false;
        $reserva1->save();
        
        $reserva2 = new Reserva();
        $reserva2->idTurno = 2;
        $reserva2->idCliente = 1;
        $reserva2->esPeriodica = false;
        $reserva2->save();
        
        $reserva3 = new Reserva();
        $reserva3->idTurno = 7;
        $reserva3->idCliente = 1;
        $reserva3->esPeriodica = false;
        $reserva3->save();
        
        $reserva4 = new Reserva();
        $reserva4->idTurno = 12;
        $reserva4->idCliente = 1;
        $reserva4->esPeriodica = false;
        $reserva4->save();
    }
}
