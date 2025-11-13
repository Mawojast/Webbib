<?php

namespace App\Rules;

use App\Models\User;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Rule MaxDashboards
 *
 * This rule ensures that the currently logged in user
 * cannot create more than a certain number of dashboards.
 */
class MaxDashboardsRule implements ValidationRule
{
    public const LIMIT = 140;

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
        if ($this->user->dashboardCount >= self::LIMIT) {
            $fail("Maximum dashboard links of ".self::LIMIT." reached.");
        }
    }
}
