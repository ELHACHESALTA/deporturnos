<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\ComplejoServicio;

class Servicio extends Model
{
    use HasFactory;

    protected $fillable = [
        'descripcionServicio',
    ];

    public function complejoServicio(){
        return $this->hasMany(ComplejoServicio::class);
    }
}
