<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PrivacyPolicy;
use App\Models\UserPrivacyPolicy;
use App\Models\TermsOfService;
use Inertia\Inertia;
use Inertia\Response;

class PolController extends Controller
{
    public function privacyPolicy(): Response
    {
        $location = 'ZZ';
        $htmlText = PrivacyPolicy::where('location', $location)
            ->orderByDesc('valid_from')
            ->value('html_text');

        return Inertia::render('pol/PrivacyPolicy', [
            'htmlText' => $htmlText,
        ]);
    }

    public function userPrivacyPolicy(): Response
    {
        $location = 'ZZ';
        $htmlText = UserPrivacyPolicy::where('location', $location)
            ->orderByDesc('valid_from')
            ->value('html_text');

        return Inertia::render('pol/UserPrivacyPolicy', [
            'htmlText' => $htmlText,
        ]);
    }

    public function termsOfService(): Response
    {
        $location = 'ZZ';
        $htmlText = TermsOfService::where('location', $location)
            ->orderByDesc('valid_from')
            ->value('html_text');

        return Inertia::render('pol/TermsOfService', [
            'htmlText' => $htmlText,
        ]);
    }

    public function imprint(): Response
    {
        return Inertia::render('pol/Imprint');
    }
}
