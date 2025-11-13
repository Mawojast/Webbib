<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TermsOfServiceAgreement extends Model
{
    protected $fillable = [
        'user_id',
        'terms_of_service_version',
        'ip',
        'time',
        'timezone',
        'email',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
