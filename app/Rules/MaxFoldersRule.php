<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\User;

/**
 * Rule MaxFolders
 *
 * This rule ensures that the currently logged in user
 * cannot create more than a certain number of folder.
 */
class MaxFoldersRule implements ValidationRule
{
    public const LIMIT = 100;

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
        if ($this->user->folderCount >= self::LIMIT) {
            $fail("Maximum topics of ".self::LIMIT." reached.");
        }
    }
}
