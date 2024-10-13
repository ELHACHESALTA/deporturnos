<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComplejoServicio extends Model
{
    use HasFactory;

    protected $fillable = [
        'idServicio',
        'idComplejo',
    ];

    public function servicio(){
        return $this->belongsTo(Servicio::class);
    }

    public function complejo(){
        return $this->belongsTo(Complejo::class);
    }
}
