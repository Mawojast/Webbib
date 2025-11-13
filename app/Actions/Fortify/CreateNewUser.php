<?php

namespace App\Actions\Fortify;

use App\Models\User;
use App\Models\ForbiddenUsername;
use App\Models\UserPrivacyPolicyAgreement;
use App\Models\TermsOfServiceAgreement;
use App\Models\PrivacyPolicy;
use App\Models\TermsOfService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use App\Rules\ValidUsernameRule;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use DateTime;
use DateTimeZone;
use Exception;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => [
                'required',
                'string',
                'unique:'.User::class,
                new ValidUsernameRule(new ForbiddenUsername()),
                ],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
        ])->validate();

        DB::beginTransaction();
        try {
            $user = User::create([
                'name' => strtolower($input['name']),
                'display_name' => $input['name'],
                'email' => $input['email'],
                'password' => Hash::make($input['password']),
            ]);

            // Get Latest version by location ZZ (Unspecified / global)
            $location = 'ZZ';
            $latestPrivacyPolicyVersion = PrivacyPolicy::where('location', $location)
                ->orderByDesc('valid_from')
                ->value('version');

            $latestTermsOfServiceVersion = TermsOfService::where('location', $location)
                ->orderByDesc('valid_from')
                ->value('version');

            // Get server Agreement time Datas
            $timezone = date_default_timezone_get();
            $time = new DateTime('now', new DateTimeZone($timezone));
            $datetime = $time->format('Y-m-d H:i:s');


            UserPrivacyPolicyAgreement::create([
                'user_id' => $user->id,
                'privacy_policy_version' => $latestPrivacyPolicyVersion,
                'ip' => request()->ip(),
                'email' => $user->email,
                'time' =>$datetime,
                'timezone' => $timezone,
            ]);

            TermsOfServiceAgreement::create([
                'user_id' => $user->id,
                'terms_of_service_version' => $latestTermsOfServiceVersion,
                'ip' => request()->ip(),
                'email' => $user->email,
                'time' =>$datetime,
                'timezone' => $timezone,
            ]);

            DB::commit();

            return $user;

        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
