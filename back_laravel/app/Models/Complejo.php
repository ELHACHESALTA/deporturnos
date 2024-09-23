<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\GestorComplejo;

class Complejo extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombreComplejo',
        'ciudad',
        'ubicacion',
        'diasDisponibles',
        'horaApertura',
        'horaCierre',
        'idGestorComplejo',
    ];

    public function gestorComplejo(){
        return $this->belongsTo(GestorComplejo::class);
    }
}
