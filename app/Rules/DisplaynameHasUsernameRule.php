<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;


/**
 * Rule DisplaynameHasUsername
 *
 * The display name has to be the same as the user name.
 */
class DisplaynameHasUsernameRule implements ValidationRule
{

    public function __construct(
        private string $username
    ){}
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */

    // Only the case can differ from user name
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (strtolower($this->username) !== strtolower($value)) {
            $fail("Only the case can differ from the user name");
        }
    }
}
