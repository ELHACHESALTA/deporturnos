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
        Schema::create('respuestas', function (Blueprint $table) {
            $table->id();
            $table->string('contenido', 255);
            $table->unsignedBigInteger('idGestorComplejo');
            $table->foreign('idGestorComplejo')->references('id')->on('gestor_complejos')->onDelete('cascade');
            $table->unsignedBigInteger('idResenia');
            $table->foreign('idResenia')->references('id')->on('resenias')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('respuestas');
    }
};
