<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cancha;

class CanchasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cancha1 = new Cancha();
        $cancha1->nombreCancha = "Cancha 1 de F8";
        $cancha1->idComplejo = 1;
        $cancha1->idDeporte = 2;
        $cancha1->bajaCancha = null;
        $cancha1->save();

        $cancha2 = new Cancha();
        $cancha2->nombreCancha = "Cancha 2 de F8";
        $cancha2->idComplejo = 1;
        $cancha2->idDeporte = 2;
        $cancha2->bajaCancha = null;
        $cancha2->save();

        $cancha3 = new Cancha();
        $cancha3->nombreCancha = "Cancha 1 de Futbol5";
        $cancha3->idComplejo = 1;
        $cancha3->idDeporte = 1;
        $cancha3->bajaCancha = null;
        $cancha3->save();

        $cancha4 = new Cancha();
        $cancha4->nombreCancha = "Cancha 2 de Futbol5";
        $cancha4->idComplejo = 1;
        $cancha4->idDeporte = 1;
        $cancha4->bajaCancha = null;
        $cancha4->save();

        $cancha5 = new Cancha();
        $cancha5->nombreCancha = "Cancha Boca de F8";
        $cancha5->idComplejo = 2;
        $cancha5->idDeporte = 2;
        $cancha5->bajaCancha = null;
        $cancha5->save();

        $cancha6 = new Cancha();
        $cancha6->nombreCancha = "Cancha River de F8";
        $cancha6->idComplejo = 2;
        $cancha6->idDeporte = 2;
        $cancha6->bajaCancha = null;
        $cancha6->save();

        $cancha7 = new Cancha();
        $cancha7->nombreCancha = "Única cancha de F5";
        $cancha7->idComplejo = 1;
        $cancha7->idDeporte = 1;
        $cancha7->bajaCancha = null;
        $cancha7->save();

        $cancha8 = new Cancha();
        $cancha8->nombreCancha = "Cancha Padel 1 CPC";
        $cancha8->idComplejo = 3;
        $cancha8->idDeporte = 4;
        $cancha8->bajaCancha = null;
        $cancha8->save();

        $cancha9 = new Cancha();
        $cancha9->nombreCancha = "Cancha Padel 2 CPC";
        $cancha9->idComplejo = 3;
        $cancha9->idDeporte = 4;
        $cancha9->bajaCancha = null;
        $cancha9->save();

        $cancha10 = new Cancha();
        $cancha10->nombreCancha = "Cancha Padel 3 CPC";
        $cancha10->idComplejo = 3;
        $cancha10->idDeporte = 4;
        $cancha10->bajaCancha = null;
        $cancha10->save();

        $cancha11 = new Cancha();
        $cancha11->nombreCancha = "Cancha 1 de Padel";
        $cancha11->idComplejo = 4;
        $cancha11->idDeporte = 4;
        $cancha11->bajaCancha = null;
        $cancha11->save();

        $cancha12 = new Cancha();
        $cancha12->nombreCancha = "Cancha 1 de F5";
        $cancha12->idComplejo = 4;
        $cancha12->idDeporte = 1;
        $cancha12->bajaCancha = null;
        $cancha12->save();

        $cancha13 = new Cancha();
        $cancha13->nombreCancha = "Cancha 2 de Padel";
        $cancha13->idComplejo = 4;
        $cancha13->idDeporte = 4;
        $cancha13->bajaCancha = null;
        $cancha13->save();

        $cancha14 = new Cancha();
        $cancha14->nombreCancha = "Cancha LRF5 1";
        $cancha14->idComplejo = 5;
        $cancha14->idDeporte = 1;
        $cancha14->bajaCancha = null;
        $cancha14->save();

        $cancha15 = new Cancha();
        $cancha15->nombreCancha = "Cancha LRF5 2";
        $cancha15->idComplejo = 5;
        $cancha15->idDeporte = 1;
        $cancha15->bajaCancha = null;
        $cancha15->save();

        $cancha16 = new Cancha();
        $cancha16->nombreCancha = "Cancha LRF5 3";
        $cancha16->idComplejo = 5;
        $cancha16->idDeporte = 1;
        $cancha16->bajaCancha = null;
        $cancha16->save();

        $cancha17 = new Cancha();
        $cancha17->nombreCancha = "Cancha 1 SP";
        $cancha17->idComplejo = 6;
        $cancha17->idDeporte = 4;
        $cancha17->bajaCancha = null;
        $cancha17->save();

        $cancha18 = new Cancha();
        $cancha18->nombreCancha = "Cancha 2 SP";
        $cancha18->idComplejo = 6;
        $cancha18->idDeporte = 4;
        $cancha18->bajaCancha = null;
        $cancha18->save();

        $cancha19 = new Cancha();
        $cancha19->nombreCancha = "Cancha 3 SP";
        $cancha19->idComplejo = 6;
        $cancha19->idDeporte = 4;
        $cancha19->bajaCancha = null;
        $cancha19->save();

        $cancha20 = new Cancha();
        $cancha20->nombreCancha = "Cancha F11 Nro 1 CIF";
        $cancha20->idComplejo = 7;
        $cancha20->idDeporte = 3;
        $cancha20->bajaCancha = null;
        $cancha20->save();
        
        $cancha21 = new Cancha();
        $cancha21->nombreCancha = "Cancha F11 Nro 2 CIF";
        $cancha21->idComplejo = 7;
        $cancha21->idDeporte = 3;
        $cancha21->bajaCancha = null;
        $cancha21->save();

        $cancha22 = new Cancha();
        $cancha22->nombreCancha = "Cancha F11 Nro 3 CIF";
        $cancha22->idComplejo = 7;
        $cancha22->idDeporte = 3;
        $cancha22->bajaCancha = null;
        $cancha22->save();

        $cancha23 = new Cancha();
        $cancha23->nombreCancha = "Cancha F11 Nro 4 CIF";
        $cancha23->idComplejo = 7;
        $cancha23->idDeporte = 3;
        $cancha23->bajaCancha = null;
        $cancha23->save();
    }
}
