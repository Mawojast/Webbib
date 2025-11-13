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
        if (Schema::hasTable('user_agreement_privacy_policies')) {
            Schema::rename('user_agreement_privacy_policies', 'user_privacy_policy_agreements');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('user_privacy_policy_agreements')) {
            Schema::rename('user_privacy_policy_agreements', 'user_agreement_privacy_policies');
        }
    }
};
