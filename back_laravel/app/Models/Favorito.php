<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorito extends Model
{
    use HasFactory;

    protected $fillable = [
        'idCliente',
        'idComplejo',
    ];

    public function cliente(){
        return $this->belongsTo(Cliente::class);
    }

    public function complejo(){
        return $this->belongsTo(Complejo::class);
    }
}
