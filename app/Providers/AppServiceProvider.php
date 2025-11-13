<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\Dashboard;
use App\Models\Folder;
use App\Models\Link;
use App\Models\UserFront;
use App\Policies\DashboardPolicy;
use App\Policies\FolderPolicy;
use App\Policies\LinkPolicy;
use App\Policies\UserFrontPolicy;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;

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
       // Policies
        Gate::policy(Folder::class, FolderPolicy::class);
        Gate::policy(Link::class, LinkPolicy::class);
        Gate::policy(Dashboard::class, DashboardPolicy::class);
        Gate::policy(UserFront::class, UserFrontPolicy::class);

        // Rate limits
        $this->limitLoginAttemptsPerMinute(5);
    }

    protected function limitLoginAttemptsPerMinute(int $attempts): void
    {
        RateLimiter::for('login', function ($request) use ($attempts) {
            $identifier = strtolower($request->input('identifier'));
            $ip = $request->ip();

            return [
                Limit::perMinute($attempts)->by("login:{$ip}|{$identifier}"),
            ];
        });
    }
}
