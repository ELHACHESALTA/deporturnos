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
        Schema::create('complejo_servicios', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idServicio');
            $table->foreign('idServicio')->references('id')->on('servicios')->onDelete('cascade');
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
        Schema::dropIfExists('complejo_servicios');
    }
};
