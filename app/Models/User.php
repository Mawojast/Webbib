<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'display_name'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'name';
    }

    public function userFront(): HasMany
    {
        return $this->hasMany(UserFront::class);
    }

    public function dashboards(): HasMany
    {
        return $this->hasMany(Dashboard::class);
    }

    public function folders(): HasMany
    {
        return $this->hasMany(Folder::class);
    }

    public function sidebarFolders(): BelongsToMany
    {
        return $this->belongsToMany(Folder::class, 'sidebar_folders', 'user_id', 'folder_id');
    }


    public function sidebarFoldersWithData(): BelongsToMany
    {
        return $this->belongsToMany(Folder::class, 'sidebar_folders', 'user_id', 'folder_id')
            ->withTimestamps();
    }

    public function links(): HasManyThrough
    {
        return $this->hasManyThrough(Link::class, Folder::class);
    }

    public function linkCount(): Attribute
    {
        return Attribute::make(
            get: fn(): int => $this->links()->count()
        );
    }

    public function folderCount(): Attribute
    {
        return Attribute::make(
            get: fn(): int => $this->folders->count()
        );
    }

    public function dashboardCount(): Attribute
    {
        return Attribute::make(
            get: fn(): int => $this->dashboards->count()
        );
    }

    /**
     * Returns url of user image with cloud s3 service
     * If user image does not exist, return default user image path
     */
    public function getImageUrl(): string
    {
        if (Storage::disk('s3')->exists($this->image)){
            return Storage::url($this->image);
        }

        return env('DEFAULT_PROFILE_IMAGE_PATH');
    }
}
