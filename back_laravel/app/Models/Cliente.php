<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable = [
        'idUser',
        'urlFotoPerfil',
    ];

    public function users(){
        return $this->belongsTo(User::class);
    }

    public function reserva(){
        return $this->hasMany(Reserva::class);
    }

    public function favorito(){
        return $this->hasMany(Favorito::class);
    }

    public function resenia(){
        return $this->hasMany(Resenia::class);
    }
}
