<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserFrontFolderIsPublic
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $routeUserName = $request->route('user')->name;
        $folderUserName = $request->route('folder')->user->name;
        $folderIsPublic = $request->route('folder')->public;

        if (!isset($routeUserName) || !$folderIsPublic || $routeUserName !== $folderUserName){
            abort(404);
        }

        return $next($request);
    }
}
