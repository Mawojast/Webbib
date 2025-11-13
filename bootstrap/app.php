<?php

use App\Http\Middleware\AddContentSecurityPolicyHeaders;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\SetHeaders;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request ;
use Inertia\Inertia;

use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Illuminate\Support\Facades\App;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
            SetHeaders::class,
            AddContentSecurityPolicyHeaders::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {

        //if (!app()->environment('production')) return;
        
        // 404
        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            if ($request->wantsJson()) {
                return response()->json(['message' => 'Resource was not founded.'], 404);
            }

            return Inertia::render('errors/404')
                ->toResponse($request)
                ->setStatusCode(404);
        });

        // 405
        $exceptions->render(function (MethodNotAllowedHttpException $e, Request $request) {
            if ($request->wantsJson()) {
                return response()->json(['message' => 'Wrong Method.'], 405);
            }

            return Inertia::render('errors/405')
                ->toResponse($request)
                ->setStatusCode(405);
        });

        // 429
        $exceptions->render(function (ThrottleRequestsException $e, Request $request) {

            // Throttle - login
            if (in_array('throttle:login', $request->route()->gatherMiddleware())) {
                return response()->json([
                    'message' => 'Too many login attempts, please waite.',
                    'retry_after' => $e->getHeaders()['Retry-After'] ?? null,
                ], 429);
            }
        });

        // Other HTTP-Failures
        $exceptions->render(function (Throwable $e, Request $request) {
            $logger = App::make('log');

            // Log
            $logger->error('Exception intercepted', [
                'class' => get_class($e),
                'message' => $e->getMessage(),
                'url' => $request->fullUrl(),
                'method' => $request->method(),
                'user_id' => optional($request->user())->id,
                'trace' => $e->getTraceAsString(),
            ]);

            // return as json
            if ($e instanceof HttpExceptionInterface) {
                $status = $e->getStatusCode();

                $errors = [500];
                if (in_array($status, $errors)) {
                    return response()->json([
                        'message' => 'An error has occurred',
                        'error' => $e,
                    ], $status);
                }
            }
        });

    })->create();
