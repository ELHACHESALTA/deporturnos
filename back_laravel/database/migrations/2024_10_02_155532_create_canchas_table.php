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
        Schema::create('canchas', function (Blueprint $table) {
            $table->id();
            $table->string('nombreCancha', 50);
            $table->unsignedBigInteger('idComplejo');
            $table->foreign('idComplejo')->references('id')->on('complejos')->onDelete('cascade');
            $table->unsignedBigInteger('idDeporte');
            $table->foreign('idDeporte')->references('id')->on('deportes')->onDelete('cascade');
            $table->timestamp('bajaCancha')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('canchas');
    }
};
