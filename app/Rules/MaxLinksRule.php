<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

/**
 * Rule MaxLinks
 *
 * This rule ensures that the currently logged in user
 * cannot create more than a certain number of links.
 */
class MaxLinksRule implements ValidationRule
{
    public const LIMIT = 2000;

    public function __construct(
        private User $user
    ){}
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if ($this->user->linkCount >= self::LIMIT) {
            $fail("Maximum links of ".self::LIMIT." reached.");
        }
    }
}
