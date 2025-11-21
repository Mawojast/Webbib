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
        Schema::table('links', function (Blueprint $table) {
            $table->dropForeign(['folder_id']);

            $table->unsignedBigInteger('folder_id')->nullable()->change();

            $table->foreign('folder_id')
                ->references('id')
                ->on('folders')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('links', function (Blueprint $table) {
            $table->dropForeign(['folder_id']);

            $table->unsignedBigInteger('folder_id')->nullable(false)->change();

            $table->foreign('folder_id')
                ->references('id')
                ->on('folders')
                ->cascadeOnDelete();
        });
    }
};
