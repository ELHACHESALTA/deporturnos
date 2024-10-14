<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\GestorComplejo;
use App\Models\Cancha;
use App\Models\Dia;
use App\Models\ComplejoServicio;

class Complejo extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombreComplejo',
        'ciudad',
        'ubicacion',
        'idGestorComplejo',
    ];

    public function gestorComplejo(){
        return $this->belongsTo(GestorComplejo::class);
    }

    public function cancha(){
        return $this->hasMany(Cancha::class);
    }

    public function dia(){
        return $this->hasMany(Dia::class);
    }

    public function complejoServicio(){
        return $this->hasMany(ComplejoServicio::class);
    }

    public function favorito(){
        return $this->hasMany(Favorito::class);
    }
}
