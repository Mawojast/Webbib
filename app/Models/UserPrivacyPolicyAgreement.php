<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserPrivacyPolicyAgreement extends Model
{
    protected $fillable = [
        'user_id',
        'privacy_policy_version',
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
