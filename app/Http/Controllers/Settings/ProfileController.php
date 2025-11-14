<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Http\Requests\Settings\ProfileImageUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        $user = User::findOrFail(Auth::id());
        return Inertia::render('settings/Profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Show the user's profile settings page.
     */
    public function imageEdit(Request $request): Response
    {
        $user = User::findOrFail(Auth::id());
        return Inertia::render('settings/ProfileImage', [
            'user' => $user->only('name', 'image', 'email'),
            'profileImage' => $user->getImageUrl(),
        ]);

    }

    /**
     * Update the user's profile information.
     */
    public function imageUpdate(ProfileImageUpdateRequest $request)
    {
        $user = User::findOrFail(Auth::id());

        if ($request->hasFile('image')) {

            Storage::disk('s3')->delete( $user->image );

            $file = $request->file('image');
            $filename = $file->hashName();

            $path = Storage::disk('s3')->putFileAs(
                '',
                $file,
                $filename,
                'public'
            );

            $user->image = $path;
            $user->save();
        }

        return redirect()->route('profile.image.edit');


    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return to_route('profile.edit');
    }

    public function imageDestroy(Request $request): RedirectResponse
    {
        $user = $request->user();

        Storage::disk('s3')->delete( $user->image );
        $user->image = env('DEFAULT_PROFILE_IMAGE_NAME');
        $user->save();


        return redirect()->route('profile.image.edit');

    }

    /**
     * Delete the user's profile.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        Storage::disk('s3')->delete($user->image);
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
