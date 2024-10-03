<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Complejo;
use App\Models\Deporte;
use App\Models\Turno;

class Cancha extends Model
{
    use HasFactory;

    protected $fillable = [
        'idComplejo',
        'nombreCancha',
        'idDeporte',
    ];

    public function complejo(){
        return $this->belongsTo(Complejo::class);
    }

    public function deporte(){
        return $this->belongsTo(Deporte::class);
    }

    public function turno(){
        return $this->hasMany(Turno::class);
    }
}
