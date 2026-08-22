<?php

namespace App\Services;

use App\Models\Analytic;
use App\Models\Url;

class AnalyticsService
{
    public function recordVisit(Url $url): void
    {
        Analytic::create([
            'ip_address' => collect(['192.168.1.20', '192.168.1.30', '192.168.1.40', '192.168.1.50'])->random(),
            'user_agent' => collect(['Browser1', 'Browser2', 'Browser3', 'Browser4'])->random(),
            'referer' => collect(['domain1', 'domain2', 'domain3', 'domain4'])->random(),
            'country' => collect(['ES', 'FR', 'DE', 'IT'])->random(),
            'device' => collect(['Mobile', 'Desktop'])->random(),
            'url_id' => $url->id,
        ]);
    }
}
