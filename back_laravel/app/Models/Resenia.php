<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resenia extends Model
{
    use HasFactory;

    protected $fillable = [
        'calificacion',
        'comentario',
        'idCliente',
        'idComplejo',
    ];

    public function cliente(){
        return $this->belongsTo(Cliente::class);
    }

    public function complejo(){
        return $this->belongsTo(Complejo::class);
    }

    public function respuesta(){
        return $this->hasOne(Respuesta::class);
    }
     
}
