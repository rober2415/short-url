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

        // Global permisions
        Permission::create(['name' => 'view-analytics', 'guard_name' => $guard]);
        Permission::create(['name' => 'view-any-url', 'guard_name' => $guard]);
        Permission::create(['name' => 'delete-any-url', 'guard_name' => $guard]);

        // User
        Role::create(['name' => 'user', 'guard_name' => $guard]);

        // Support
        $supportRole = Role::create(['name' => 'support', 'guard_name' => $guard]);
        $supportRole->givePermissionTo(['view-any-url']);

        // Admin
        $adminRole = Role::create(['name' => 'admin', 'guard_name' => $guard]);
        $adminRole->givePermissionTo(Permission::where('guard_name', $guard)->get());
    }
}
