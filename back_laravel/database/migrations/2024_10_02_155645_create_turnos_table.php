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
        Schema::create('turnos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idCancha');
            $table->foreign('idCancha')->references('id')->on('canchas')->onDelete('cascade');
            $table->dateTime('horarioInicio');
            $table->dateTime('horarioFin');
            $table->string('estadoDisponible', 50);
            $table->string('metodoPago', 50);
            $table->time('timerPago');
            $table->time('timerReprogramacion');
            $table->float('precio');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('turnos');
    }
};
