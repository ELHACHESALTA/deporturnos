<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Dia;

class DiasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dia1 = new Dia();
        $dia1->dia = "Lunes";
        $dia1->horaApertura = "09:00";
        $dia1->horaCierre = "17:00";
        $dia1->idComplejo = 1;
        $dia1->save();

        $dia2 = new Dia();
        $dia2->dia = "Domingo";
        $dia2->horaApertura = "10:00";
        $dia2->horaCierre = "18:00";
        $dia2->idComplejo = 1;
        $dia2->save();

        $dia3 = new Dia();
        $dia3->dia = "Sábado";
        $dia3->horaApertura = "09:30";
        $dia3->horaCierre = "17:30";
        $dia3->idComplejo = 1;
        $dia3->save();

        $dia4 = new Dia();
        $dia4->dia = "Jueves";
        $dia4->horaApertura = "10:30";
        $dia4->horaCierre = "18:30";
        $dia4->idComplejo = 1;
        $dia4->save();

        $dia5 = new Dia();
        $dia5->dia = "Martes";
        $dia5->horaApertura = "10:30";
        $dia5->horaCierre = "18:30";
        $dia5->idComplejo = 2;
        $dia5->save();

        $dia6 = new Dia();
        $dia6->dia = "Lunes";
        $dia6->horaApertura = "07:00";
        $dia6->horaCierre = "15:00";
        $dia6->idComplejo = 2;
        $dia6->save();

        $dia7 = new Dia();
        $dia7->dia = "Domingo";
        $dia7->horaApertura = "11:00";
        $dia7->horaCierre = "19:00";
        $dia7->idComplejo = 2;
        $dia7->save();

        $dia8 = new Dia();
        $dia8->dia = "Viernes";
        $dia8->horaApertura = "08:30";
        $dia8->horaCierre = "16:30";
        $dia8->idComplejo = 2;
        $dia8->save();

        $dia9 = new Dia();
        $dia9->dia = "Miércoles";
        $dia9->horaApertura = "08:00";
        $dia9->horaCierre = "16:00";
        $dia9->idComplejo = 3;
        $dia9->save();

        $dia10 = new Dia();
        $dia10->dia = "Martes";
        $dia10->horaApertura = "08:30";
        $dia10->horaCierre = "16:30";
        $dia10->idComplejo = 3;
        $dia10->save();

        $dia11 = new Dia();
        $dia11->dia = "Lunes";
        $dia11->horaApertura = "11:30";
        $dia11->horaCierre = "19:30";
        $dia11->idComplejo = 3;
        $dia11->save();

        $dia12 = new Dia();
        $dia12->dia = "Sábado";
        $dia12->horaApertura = "14:30";
        $dia12->horaCierre = "22:30";
        $dia12->idComplejo = 3;
        $dia12->save();

        $dia13 = new Dia();
        $dia13->dia = "Jueves";
        $dia13->horaApertura = "09:30";
        $dia13->horaCierre = "17:30";
        $dia13->idComplejo = 4;
        $dia13->save();

        $dia14 = new Dia();
        $dia14->dia = "Miércoles";
        $dia14->horaApertura = "10:00";
        $dia14->horaCierre = "18:00";
        $dia14->idComplejo = 4;
        $dia14->save();

        $dia15 = new Dia();
        $dia15->dia = "Martes";
        $dia15->horaApertura = "07:00";
        $dia15->horaCierre = "15:00";
        $dia15->idComplejo = 4;
        $dia15->save();

        $dia16 = new Dia();
        $dia16->dia = "Domingo";
        $dia16->horaApertura = "12:00";
        $dia16->horaCierre = "20:00";
        $dia16->idComplejo = 4;
        $dia16->save();

        $dia17 = new Dia();
        $dia17->dia = "Viernes";
        $dia17->horaApertura = "11:00";
        $dia17->horaCierre = "19:00";
        $dia17->idComplejo = 5;
        $dia17->save();

        $dia18 = new Dia();
        $dia18->dia = "Jueves";
        $dia18->horaApertura = "09:00";
        $dia18->horaCierre = "17:00";
        $dia18->idComplejo = 5;
        $dia18->save();

        $dia19 = new Dia();
        $dia19->dia = "Miércoles";
        $dia19->horaApertura = "12:00";
        $dia19->horaCierre = "20:00";
        $dia19->idComplejo = 5;
        $dia19->save();

        $dia20 = new Dia();
        $dia20->dia = "Lunes";
        $dia20->horaApertura = "10:00";
        $dia20->horaCierre = "18:00";
        $dia20->idComplejo = 5;
        $dia20->save();

        $dia21 = new Dia();
        $dia21->dia = "Sábado";
        $dia21->horaApertura = "12:00";
        $dia21->horaCierre = "20:00";
        $dia21->idComplejo = 6;
        $dia21->save();

        $dia22 = new Dia();
        $dia22->dia = "Viernes";
        $dia22->horaApertura = "07:30";
        $dia22->horaCierre = "15:30";
        $dia22->idComplejo = 6;
        $dia22->save();

        $dia23 = new Dia();
        $dia23->dia = "Jueves";
        $dia23->horaApertura = "13:00";
        $dia23->horaCierre = "21:00";
        $dia23->idComplejo = 6;
        $dia23->save();

        $dia24 = new Dia();
        $dia24->dia = "Martes";
        $dia24->horaApertura = "07:30";
        $dia24->horaCierre = "15:30";
        $dia24->idComplejo = 6;
        $dia24->save();

        $dia25 = new Dia();
        $dia25->dia = "Lunes";
        $dia25->horaApertura = "09:00";
        $dia25->horaCierre = "17:00";
        $dia25->idComplejo = 6;
        $dia25->save();

        $dia26 = new Dia();
        $dia26->dia = "Domingo";
        $dia26->horaApertura = "13:30";
        $dia26->horaCierre = "21:30";
        $dia26->idComplejo = 7;
        $dia26->save();

        $dia27 = new Dia();
        $dia27->dia = "Sábado";
        $dia27->horaApertura = "14:00";
        $dia27->horaCierre = "22:00";
        $dia27->idComplejo = 7;
        $dia27->save();

        $dia28 = new Dia();
        $dia28->dia = "Viernes";
        $dia28->horaApertura = "08:00";
        $dia28->horaCierre = "16:00";
        $dia28->idComplejo = 7;
        $dia28->save();

        $dia29 = new Dia();
        $dia29->dia = "Miércoles";
        $dia29->horaApertura = "09:00";
        $dia29->horaCierre = "17:00";
        $dia29->idComplejo = 7;
        $dia29->save();        

        $dia30 = new Dia();
        $dia30->dia = "Martes";
        $dia30->horaApertura = "10:00";
        $dia30->horaCierre = "18:00";
        $dia30->idComplejo = 7;
        $dia30->save();
    }
}
