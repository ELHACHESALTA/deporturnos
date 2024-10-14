<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;

    protected $fillable = [
        'idTurno',
        'idCliente',
        'esPeriodica',
        'patronPeriodico',
    ];

    public function cliente(){
        return $this->belongsTo(Cliente::class);
    }

    public function turno(){
        return $this->hasMany(Turno::class);
    }
}
