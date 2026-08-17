<?php

namespace App\Services;

use App\Models\Analytic;
use App\Models\Url;
use Illuminate\Http\Request;

class AnalyticsService
{
    public function recordVisit(Request $request, Url $url): void
    {
        $userAgent = $request->header('User-Agent');
        $referer = $this->normalizeReferer($request->header('referer'));
        $country = $this->normalizeCountry(
            $request->header('CF-IPCountry')
                ?: $request->header('X-Country-Code')
        );

        Analytic::create([
            'ip_address' => $request->ip() ?? 'Uknown',
            'user_agent' => $userAgent,
            'referer' => $referer,
            'country' => $country,
            'device' => $this->detectDevice($userAgent),
            'url_id' => $url->id,
        ]);
    }

    private function normalizeReferer(?string $referer): string
    {
        $value = trim((string) $referer);

        return $value !== '' ? $value : 'Direct';
    }

    private function normalizeCountry(?string $country): string
    {
        $value = trim((string) $country);

        return $value !== '' ? strtoupper($value) : 'Unknown';
    }

    private function detectDevice(?string $userAgent): ?string
    {
        if (blank($userAgent)) {
            return null;
        }

        $agent = strtolower($userAgent);

        if (str_contains($agent, 'iphone') || str_contains($agent, 'ipad') || str_contains($agent, 'android')) {
            return 'Mobile';
        }

        if (str_contains($agent, 'windows') || str_contains($agent, 'macintosh') || str_contains($agent, 'linux')) {
            return 'Desktop';
        }

        return 'Unknown';
    }
}
