<?php

namespace App\Policies;

use App\Models\UserFront;
use App\Models\User;

class UserFrontPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, UserFront $userFront, string $usename): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, ?string $name): bool
    {
        return $user->name === $name;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, UserFront $userFront, string $username): bool
    {
        return $user->id === $userFront->user_id && $user->name === $username;
    }

        /**
     * Determine whether the user can update the model.
     */
    public function updatePosition(User $user, UserFront $userFront, string $username): bool
    {
        return $user->id === $userFront->user_id && $user->name === $username;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, UserFront $userFront, string $username): bool
    {
        return $user->id === $userFront->user_id && $user->name === $username;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, UserFront $userFront): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, UserFront $userFront): bool
    {
        return false;
    }

        /**
     * Determine whether the user can action on models.
     */
    public function action(User $user, ?string $name): bool
    {
        return $user->name === $name;
    }
}
