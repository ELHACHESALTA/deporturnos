<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Complejo;

class GestorComplejo extends Model
{
    use HasFactory;

    protected $fillable = [
        'idUser',
    ];


    public function users(){
        return $this->belongsTo(User::class);
    }

    public function complejo(){
        return $this->hasOne(Complejo::class);
    }

    public function respuesta(){
        return $this->hasMany(Respuesta::class);
    }
}
