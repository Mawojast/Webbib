<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Vite;
use Symfony\Component\HttpFoundation\Response;

class AddContentSecurityPolicyHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        Vite::useCspNonce();
        $nonce = Vite::cspNonce();
        $request->attributes->set('vite_nonce', $nonce);
        return $next($request)->withHeaders([
            'Content-Security-Policy' => implode('; ', [
                "default-src 'self'",
                "script-src 'self' 'nonce-".$nonce."'",
                "style-src 'self' 'unsafe-inline'",
                "img-src 'self' https:",
                "font-src 'self'",
                "form-action 'self'",
                "object-src 'self'",
                "frame-ancestors 'none'",
                app()->isLocal()
                    ? "connect-src 'self' *"
                    : "connect-src 'self' https://www.webbib.net",
            ])
        ]);
    }
}
