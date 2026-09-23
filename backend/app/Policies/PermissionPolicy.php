<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Permission;
use App\Models\User;

class PermissionPolicy
{
    public function before(User $user, string $ability): ?bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }
        return null;
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('view-any-permission');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user): bool
    {
        return $user->hasPermissionTo('view-permission');
    }
}
