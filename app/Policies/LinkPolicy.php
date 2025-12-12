<?php

namespace App\Policies;

use App\Models\Link;
use App\Models\User;
use App\Models\Folder;

class LinkPolicy
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
    public function view(User $user, Link $link): bool
    {
        return $user->id === $link->folder->user_id;
    }


    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models assigned to a folder.
     */
    public function createExplorerLink(User $user, Folder $folder): bool
    {
        return $user->id === $folder->user_id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function updateExplorerLink(User $user, Link $link): bool
    {
        return $user->id === $link->folder->user_id;
    }

    public function update(User $user, Link $link): bool
    {
        return $user->id === $link->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Link $link): bool
    {
        return $user->id === $link->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function deleteLinks(User $user, array $links): bool
    {
        dd($links);
        //return $user->id === $link->folder->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Link $link): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Link $link): bool
    {
        return false;
    }
}
