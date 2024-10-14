<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Turno;

class TurnosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $turno1 = new Turno();
        $turno1->idCancha = 1;
        $turno1->horarioInicio = "2024-10-14 09:00";
        $turno1->horarioFin = "2024-10-14 10:00";
        $turno1->estadoDisponible = "disponible";
        $turno1->metodoPago = "mercado pago";
        $turno1->timerPago = "00:05:00";
        $turno1->timerReprogramacion = "10:00:00";
        $turno1->precio = 15000;
        $turno1->save();

        $turno2 = new Turno();
        $turno2->idCancha = 2;
        $turno2->horarioInicio = "2024-10-31 11:00";
        $turno2->horarioFin = "2024-10-31 12:00";
        $turno2->estadoDisponible = "disponible";
        $turno2->metodoPago = "mercado pago";
        $turno2->timerPago = "00:05:00";
        $turno2->timerReprogramacion = "09:30:00";
        $turno2->precio = 16000;
        $turno2->save();

        $turno3 = new Turno();
        $turno3->idCancha = 3;
        $turno3->horarioInicio = "2024-10-31 14:00";
        $turno3->horarioFin = "2024-10-31 15:00";
        $turno3->estadoDisponible = "disponible";
        $turno3->metodoPago = "mercado pago";
        $turno3->timerPago = "00:05:00";
        $turno3->timerReprogramacion = "08:45:00";
        $turno3->precio = 14500;
        $turno3->save();

        $turno4 = new Turno();
        $turno4->idCancha = 4;
        $turno4->horarioInicio = "2024-10-31 13:00";
        $turno4->horarioFin = "2024-10-31 14:00";
        $turno4->estadoDisponible = "disponible";
        $turno4->metodoPago = "mercado pago";
        $turno4->timerPago = "00:05:00";
        $turno4->timerReprogramacion = "09:15:00";
        $turno4->precio = 17000;
        $turno4->save();

        $turno5 = new Turno();
        $turno5->idCancha = 5;
        $turno5->horarioInicio = "2024-10-20 16:00";
        $turno5->horarioFin = "2024-10-20 17:00";
        $turno5->estadoDisponible = "disponible";
        $turno5->metodoPago = "mercado pago";
        $turno5->timerPago = "00:05:00";
        $turno5->timerReprogramacion = "07:45:00";
        $turno5->precio = 18000;
        $turno5->save();

        $turno6 = new Turno();
        $turno6->idCancha = 6;
        $turno6->horarioInicio = "2024-10-20 15:00";
        $turno6->horarioFin = "2024-10-20 16:00";
        $turno6->estadoDisponible = "disponible";
        $turno6->metodoPago = "mercado pago";
        $turno6->timerPago = "00:05:00";
        $turno6->timerReprogramacion = "10:30:00";
        $turno6->precio = 17500;
        $turno6->save();

        $turno7 = new Turno();
        $turno7->idCancha = 7;
        $turno7->horarioInicio = "2024-10-24 15:00";
        $turno7->horarioFin = "2024-10-24 16:00";
        $turno7->estadoDisponible = "disponible";
        $turno7->metodoPago = "mercado pago";
        $turno7->timerPago = "00:05:00";
        $turno7->timerReprogramacion = "09:00:00";
        $turno7->precio = 16000;
        $turno7->save();

        $turno8 = new Turno();
        $turno8->idCancha = 8;
        $turno8->horarioInicio = "2024-10-21 17:00";
        $turno8->horarioFin = "2024-10-21 18:30";
        $turno8->estadoDisponible = "disponible";
        $turno8->metodoPago = "mercado pago";
        $turno8->timerPago = "00:05:00";
        $turno8->timerReprogramacion = "08:30:00";
        $turno8->precio = 18500;
        $turno8->save();

        $turno9 = new Turno();
        $turno9->idCancha = 9;
        $turno9->horarioInicio = "2024-10-21 16:00";
        $turno9->horarioFin = "2024-10-21 17:30";
        $turno9->estadoDisponible = "disponible";
        $turno9->metodoPago = "mercado pago";
        $turno9->timerPago = "00:05:00";
        $turno9->timerReprogramacion = "09:45:00";
        $turno9->precio = 16500;
        $turno9->save();

        $turno10 = new Turno();
        $turno10->idCancha = 10;
        $turno10->horarioInicio = "2024-10-16 14:00";
        $turno10->horarioFin = "2024-10-16 15:30";
        $turno10->estadoDisponible = "disponible";
        $turno10->metodoPago = "mercado pago";
        $turno10->timerPago = "00:05:00";
        $turno10->timerReprogramacion = "10:15:00";
        $turno10->precio = 15000;
        $turno10->save();

        $turno11 = new Turno();
        $turno11->idCancha = 11;
        $turno11->horarioInicio = "2024-10-24 12:00";
        $turno11->horarioFin = "2024-10-24 13:30";
        $turno11->estadoDisponible = "disponible";
        $turno11->metodoPago = "mercado pago";
        $turno11->timerPago = "00:05:00";
        $turno11->timerReprogramacion = "08:15:00";
        $turno11->precio = 15500;
        $turno11->save();

        $turno12 = new Turno();
        $turno12->idCancha = 12;
        $turno12->horarioInicio = "2024-10-27 18:00";
        $turno12->horarioFin = "2024-10-27 19:00";
        $turno12->estadoDisponible = "disponible";
        $turno12->metodoPago = "mercado pago";
        $turno12->timerPago = "00:05:00";
        $turno12->timerReprogramacion = "07:30:00";
        $turno12->precio = 17000;
        $turno12->save();

        $turno13 = new Turno();
        $turno13->idCancha = 13;
        $turno13->horarioInicio = "2024-10-15 10:00";
        $turno13->horarioFin = "2024-10-15 11:30";
        $turno13->estadoDisponible = "disponible";
        $turno13->metodoPago = "mercado pago";
        $turno13->timerPago = "00:05:00";
        $turno13->timerReprogramacion = "09:00:00";
        $turno13->precio = 16000;
        $turno13->save();

        $turno14 = new Turno();
        $turno14->idCancha = 14;
        $turno14->horarioInicio = "2024-10-28 17:00";
        $turno14->horarioFin = "2024-10-28 18:00";
        $turno14->estadoDisponible = "disponible";
        $turno14->metodoPago = "mercado pago";
        $turno14->timerPago = "00:05:00";
        $turno14->timerReprogramacion = "08:30:00";
        $turno14->precio = 17500;
        $turno14->save();

        $turno15 = new Turno();
        $turno15->idCancha = 15;
        $turno15->horarioInicio = "2024-10-25 17:00";
        $turno15->horarioFin = "2024-10-25 18:00";
        $turno15->estadoDisponible = "disponible";
        $turno15->metodoPago = "mercado pago";
        $turno15->timerPago = "00:05:00";
        $turno15->timerReprogramacion = "10:45:00";
        $turno15->precio = 18000;
        $turno15->save();

    }
}
