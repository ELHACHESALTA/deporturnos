<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('complejos', function (Blueprint $table) {
            $table->id();
            $table->string('nombreComplejo', 50);
            $table->string('ciudad', 50);
            $table->string('ubicacion', 50);
            $table->string('diasDisponibles', 50);
            $table->time('horaApertura');
            $table->time('horaCierre');
            $table->unsignedBigInteger('idGestorComplejo');
            $table->foreign('idGestorComplejo')->references('id')->on('gestor_complejos')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('complejos');
    }
};
