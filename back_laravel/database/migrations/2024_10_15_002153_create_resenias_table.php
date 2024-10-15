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
        Schema::create('resenias', function (Blueprint $table) {
            $table->id();
            $table->integer('calificacion');
            $table->string('comentario', 255);
            $table->unsignedBigInteger('idCliente');
            $table->foreign('idCliente')->references('id')->on('clientes')->onDelete('cascade');
            $table->unsignedBigInteger('idComplejo');
            $table->foreign('idComplejo')->references('id')->on('complejos')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resenias');
    }
};
