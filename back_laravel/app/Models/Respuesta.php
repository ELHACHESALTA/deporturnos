<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Respuesta extends Model
{
    use HasFactory;

    protected $fillable = [
        'contenido',
        'idGestorComplejo',
        'idResenia',
    ];

    public function gestorComplejo(){
        return $this->belongsTo(GestorComplejo::class);
    }

    public function resenia(){
        return $this->belongsTo(Resenia::class);
    }
}
