<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cancha;

class Turno extends Model
{
    use HasFactory;

    protected $fillable = [
        'idCancha',
        'horarioInicio',
        'horarioFin',
        'estadoDisponible',
        'metodoPago',
        'timerPago',
        'timerReprogramacion',
        'precio',
    ];

    public function cancha(){
        return $this->belongsTo(Cancha::class);
    }
}
