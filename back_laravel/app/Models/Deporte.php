<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cancha;

class Deporte extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombreDeporte',
        'tipoDeporte',
        'duracionTurno',
    ];

    public function cancha(){
        return $this->hasMany(Cancha::class);
    }
}
