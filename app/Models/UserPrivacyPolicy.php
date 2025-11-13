<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPrivacyPolicy extends Model
{
    protected $fillable = [
        'valid_from',
        'invalid_from',
        'privacy_policy',
        'version',
        'html_text'
    ];
}
