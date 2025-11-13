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
        Schema::create('terms_of_service_agreements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('terms_of_service_version');
            $table->timestamp('time');
            $table->string('timezone');
            $table->string('ip');
            $table->string('email');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('terms_of_service_agreements');
    }
};
