<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Url extends Model
{
    use HasFactory;

    protected $fillable = ['original_url', 'short_url', 'user_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function analytics(): HasMany
    {
        return $this->hasMany(Analytic::class);
    }
}
