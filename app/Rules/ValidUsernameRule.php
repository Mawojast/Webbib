<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\ForbiddenUsername;

/**
 * Valid Username
 *
 * Checks if username is forbidden
 */
class ValidUsernameRule implements ValidationRule
{
    public function __construct(
        private ForbiddenUsername $forbiddenUsername
    ){}

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!preg_match('/^[A-Za-z0-9][A-Za-z0-9_]*$/', $value)) {
            $fail('Usernames may only contain alphanumeric characters.');
            return;
        }

        if (strlen($value) < 4) {
                $fail('The name field must be at least 4 characters.');
                return;
        }

        if (strlen($value) > 25) {
            $fail('The name field must not be greater than 25 characters.');
            return;
        }

        $invalid = $this->forbiddenUsername::where('name', $value)->exists();
        if ($invalid) {
            $fail('This name is not available.');
            return;
        }
    }
}
