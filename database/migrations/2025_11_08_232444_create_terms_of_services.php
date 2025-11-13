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
        Schema::create('terms_of_services', function (Blueprint $table) {
            $table->id();
            $table->longText('terms_of_service');
            $table->longText('html_text');
            $table->dateTime('valid_from');
            $table->dateTime('invalid_from');
            $table->string('version')->unique();
            $table->string('location');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('terms_of_services');
    }
};
