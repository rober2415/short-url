<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $guard = 'sanctum';

        // Global permissions
        Permission::create(['name' => 'view-any-url', 'guard_name' => $guard]);
        Permission::create(['name' => 'delete-any-url', 'guard_name' => $guard]);
        Permission::create(['name' => 'update-any-url', 'guard_name' => $guard]);
        Permission::create(['name' => 'restore-any-url', 'guard_name' => $guard]);
        Permission::create(['name' => 'force-delete-any-url', 'guard_name' => $guard]);

        Permission::create(['name' => 'view-any-user', 'guard_name' => $guard]);
        Permission::create(['name' => 'delete-any-user', 'guard_name' => $guard]);
        Permission::create(['name' => 'update-any-user', 'guard_name' => $guard]);
        Permission::create(['name' => 'restore-any-user', 'guard_name' => $guard]);
        Permission::create(['name' => 'force-delete-any-user', 'guard_name' => $guard]);

        // User
        Role::create(['name' => 'user', 'guard_name' => $guard]);

        // Support
        $supportRole = Role::create(['name' => 'support', 'guard_name' => $guard]);
        $supportRole->givePermissionTo([
            'view-any-url',
            'update-any-url',
            'delete-any-url',
            'restore-any-url',
            'force-delete-any-url',
            'view-any-user',
            'update-any-user',
            'delete-any-user',
            'restore-any-user',
            'force-delete-any-user'
        ]);

        // Admin
        $adminRole = Role::create(['name' => 'admin', 'guard_name' => $guard]);
        $adminRole->givePermissionTo(Permission::where('guard_name', $guard)->get());
    }
}
