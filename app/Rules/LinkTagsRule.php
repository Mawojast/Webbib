<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class LinkTagsRule implements ValidationRule
{
    private const MAX_TAGS = 8;
    private const MAX_TAG_LENGTH = 25;
    private const MIN_TAG_LENGTH = 2;
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_array($value)) {
            $fail('Invalid format, please try again');
            return;
        }

        if (count($value) > self::MAX_TAGS) {
            $fail("Only ".self::MAX_TAGS." tags allowed");
        }

        foreach ($value as $tag) {

            if (strlen($tag) > self::MAX_TAG_LENGTH) {
                $fail("Tags must not be greater than ".self::MAX_TAG_LENGTH." characters.");
            }

            if (strlen($tag) < self::MIN_TAG_LENGTH) {
                $fail("Tags must be longer than ".self::MIN_TAG_LENGTH." characters.");
            }
        }
    }
}
