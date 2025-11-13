<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        header("X-Frame-Options: DENY");
        header("Content-Language: en-GB");
        header("X-Content-Type-Options: nosniff");
        header("Strict-Transport-Security: max-age=31536000; includeSubDomains");
        header('Referrer-Policy: no-referrer-when-downgrade');
        header("Permissions-Policy': accelerometer=(), autoplay=(), camera=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), usb=(), xr-spatial-tracking=()");
        header("Access-Control-Allow-Origin: https://www.webbib.net");

        header_remove('X-Powered-By');
        header_remove('X-Robots-Tag');
        header_remove('Server');

        return $next($request);
    }
}
