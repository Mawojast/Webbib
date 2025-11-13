<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TermsOfService extends Model
{
    protected $fillable = [
        'valid_from',
        'invalid_from',
        'terms_of_service',
        'version',
    ];
}
