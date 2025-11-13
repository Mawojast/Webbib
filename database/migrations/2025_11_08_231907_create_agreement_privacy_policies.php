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
        Schema::create('user_agreement_privacy_policies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('privacy_policy_version');
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
        Schema::dropIfExists('agreement_privacy_policies');
    }
};
