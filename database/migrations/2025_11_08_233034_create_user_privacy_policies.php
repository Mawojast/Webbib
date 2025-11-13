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
        Schema::create('user_privacy_policies', function (Blueprint $table) {
            $table->id();
            $table->text('privacy_policy');
            $table->dateTime('valid_from');
            $table->dateTime('invalid_from')->nullable();
            $table->string('version')->unique();
            $table->string('location');
            $table->longText('html_text');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_privacy_policies');
    }
};
