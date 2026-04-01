<?php

namespace App\Policies;

use App\Models\User;

class ProfilePolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function updateEmail(User $user): bool
    {
        return !$user->email_verified_at || $user->email_verified_at->lte(now()->subDays(30));
    }
}
