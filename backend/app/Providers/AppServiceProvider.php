<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Sanctum::authenticateAccessTokensUsing(
            static function (PersonalAccessToken $accessToken, bool $isValid): bool {
                if (! $isValid) {
                    return false;
                }

                $lastActivityAt = $accessToken->last_used_at ?? $accessToken->created_at;

                if ($lastActivityAt === null) {
                    return false;
                }

                $expiredByInactivity = $lastActivityAt->lt(now()->subMinutes(5));

                if ($expiredByInactivity) {
                    $accessToken->delete();

                    return false;
                }

                return true;
            }
        );
    }
}
