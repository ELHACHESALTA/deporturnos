<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Complejo;

class Dia extends Model
{
    use HasFactory;

    protected $fillable = [
        'dia',
        'horaApertura',
        'horaCierre',
        'idComplejo',
    ];

    public function complejo(){
        return $this->belongsTo(Complejo::class);
    }
}
