<?php

namespace App\Services\Favicon;

use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Response;
use Illuminate\Support\Facades\Log;
use DOMDocument;
use DOMXPath;

class FaviconService
{
    private Client $httpClient;
    private string $userAgent;

    public function __construct()
    {
        $this->httpClient = new Client([
            'timeout' => 8,
            'connect_timeout' => 3,
            'verify' => true,
        ]);

        $this->userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    }

    public function getFavicon(string $url): ?string
    {
        try {
            $domain = $this->extractDomain($url);

            if ($this->isSocialMedia($domain)) {
                return $this->getSocialMediaFavicon($url, $domain);
            }

            $htmlMetaFavicon = $this->getFromHtmlMeta($url);
            if ($htmlMetaFavicon) {
                return $htmlMetaFavicon;
            }

            $favicon = $this->tryFallbackMethods($domain);

            return $favicon ?: $this->getDefaultFavicon($url);

        } catch (Exception $e) {
            return $this->getDefaultFavicon($url);
        }
    }

    private function tryFallbackMethods(string $domain): ?string
    {
        $methods = [
            'rootFavicon' => [
                'callback' => fn() => $this->getFromRootFavicon($domain),
                'timeout' => 3
            ],
            'wellKnown' => [
                'callback' => fn() => $this->getFromWellKnown($domain),
                'timeout' => 3
            ],
            'cdnFavicon' => [
                'callback' => fn() => $this->getFromCdn($domain),
                'timeout' => 3
            ]
        ];

        foreach ($methods as $method => $config) {
            try {
                $faviconUrl = $config['callback']();
                if ($faviconUrl && $this->checkUrlWithTimeout($faviconUrl, $config['timeout'])) {
                    return $faviconUrl;
                }
            } catch (Exception $e) {
                continue;
            }
        }

        return null;
    }

    private function getFromHtmlMeta(string $url): ?string
    {
        try {
            $response = $this->httpClient->get($url, [
                'headers' => [
                    'User-Agent' => $this->userAgent,
                    'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
                ]
            ]);

            $html = (string) $response->getBody();
            $baseUrl = $this->getBaseUrl($url);
            $domain = $this->extractDomain($url);

            $dom = new DOMDocument();
            @$dom->loadHTML($html);
            $xpath = new DOMXPath($dom);

            $foundIcons = [];

            $iconQueries = [
                '//link[(@rel="icon" or @rel="apple-touch-icon") and contains(@sizes, "any")]' => 100,
                // svg icons
                '//link[(@rel="icon" or @rel="apple-touch-icon") and contains(@type, "image/svg+xml")]' => 100,

                // apple touch icons
                '//link[@rel="apple-touch-icon" and contains(@sizes, "180")]' => 110,
                '//link[@rel="apple-touch-icon" and contains(@sizes, "167")]' => 95,
                '//link[@rel="apple-touch-icon" and contains(@sizes, "152")]' => 90,
                '//link[@rel="apple-touch-icon" and contains(@sizes, "144")]' => 85,

                // other standard icons
                '//link[@rel="icon" and contains(@sizes, "192")]' => 90,
                '//link[@rel="icon" and contains(@sizes, "144")]' => 85,

                // apple touch icons
                '//link[@rel="apple-touch-icon" and contains(@sizes, "120")]' => 80,
                '//link[@rel="apple-touch-icon" and contains(@sizes, "114")]' => 80,
                '//link[@rel="apple-touch-icon"]' => 70,

                // standard icons
                '//link[@rel="icon" and contains(@sizes, "128")]' => 75,
                '//link[@rel="icon" and contains(@sizes, "96")]' => 70,
                '//link[@rel="icon" and contains(@sizes, "32")]' => 60,
                '//link[@rel="icon" and contains(@sizes, "16")]' => 50,
                '//link[@rel="icon" or @rel="shortcut icon"]' => 40,

                // open graph image for social media
                '//meta[@property="og:image"]' => $this->isSocialMedia($domain) ? 95 : 30,

                // twitter images for social media
                '//meta[@name="twitter:image"]' => $this->isSocialMedia($domain) ? 95 : 30,
            ];

            foreach ($iconQueries as $query => $weight) {
                $elements = $xpath->query($query);
                foreach ($elements as $element) {
                    if ($element->hasAttribute('href')) {
                        $faviconUrl = $element->getAttribute('href');
                    } elseif ($element->hasAttribute('content')) {
                        $faviconUrl = $element->getAttribute('content');
                    } else {
                        continue;
                    }

                    $resolvedUrl = $this->resolveUrl($faviconUrl, $baseUrl);
                    if ($this->isValidFaviconUrl($resolvedUrl)) {
                        Log::debug("Found favicon via DOM: {$resolvedUrl} with weight {$weight}");
                        $foundIcons[] = [
                            'url' => $resolvedUrl,
                            'weight' => $weight
                        ];
                    }
                }
            }

            // takes icons with heigh wheight
            if (!empty($foundIcons)) {
                usort($foundIcons, fn($a, $b) => $b['weight'] - $a['weight']);
                $bestIcon = $foundIcons[0]['url'];
                return $bestIcon;
            }

            return null;

        } catch (Exception $e) {
            return null;
        }
    }

    private function getFromRootFavicon(string $domain): string
    {
        return "https://{$domain}/favicon.ico";
    }

    private function getFromWellKnown(string $domain): string
    {
        return "https://{$domain}/.well-known/icon";
    }

    private function getFromCdn(string $domain): ?string
    {
        $cdnPaths = [
            "/assets/favicon.ico",
            "/static/favicon.ico",
            "/img/favicon.ico",
            "/images/favicon.ico",
            "/content/favicon.ico",
        ];

        foreach ($cdnPaths as $path) {
            $url = "https://{$domain}{$path}";
            if ($this->checkUrlWithTimeout($url, 2)) {
                return $url;
            }
        }

        return null;
    }

    private function isSocialMedia(string $domain): bool
    {
        $socialDomains = [
            'twitch.tv', 'twitter.com', 'x.com', 'youtube.com',
            'instagram.com', 'facebook.com', 'linkedin.com',
            'tiktok.com', 'reddit.com', 'discord.com'
        ];

        return in_array($domain, $socialDomains);
    }

    private function getSocialMediaFavicon(string $url, string $domain): ?string
    {
        $metaFavicon = $this->getFromHtmlMeta($url);
        if ($metaFavicon) {
            return $metaFavicon;
        }

        $socialFavicon = $this->getSocialMediaFromMeta($url, $domain);
        if ($socialFavicon) {
            return $socialFavicon;
        }

        $fallbackFavicon = $this->tryFallbackMethods($domain);
        if ($fallbackFavicon) {
            return $fallbackFavicon;
        }

        return $this->getSocialMediaDefaultFavicon($domain);
    }

    private function getSocialMediaFromMeta(string $url, string $domain): ?string
    {
        try {
            $response = $this->httpClient->get($url, [
                'headers' => [
                    'User-Agent' => $this->userAgent,
                    'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
                ]
            ]);

            $html = (string) $response->getBody();
            $baseUrl = $this->getBaseUrl($url);

            $dom = new DOMDocument();
            @$dom->loadHTML($html);
            $xpath = new DOMXPath($dom);

            $socialQueries = [
                '//meta[@property="og:image"]',
                '//meta[@name="twitter:image"]',
                '//meta[@property="twitter:image"]',
                '//meta[@name="twitter:image:src"]',
            ];

            foreach ($socialQueries as $query) {
                $elements = $xpath->query($query);
                foreach ($elements as $element) {
                    if ($element->hasAttribute('content')) {
                        $imageUrl = $element->getAttribute('content');
                        $resolvedUrl = $this->resolveUrl($imageUrl, $baseUrl);

                        if ($this->isValidSocialMediaImage($resolvedUrl, $domain)) {
                            Log::info("Social media image found for {$domain}: {$resolvedUrl}");
                            return $resolvedUrl;
                        }
                    }
                }
            }

            return null;
        } catch (Exception $e) {
            return null;
        }
    }

    private function isValidSocialMediaImage(string $url, string $domain): bool
    {
        switch ($domain) {
            case 'twitch.tv':
                return str_contains($url, 'jtvnw.net/jtv_user_pictures') ||
                        str_contains($url, 'static-cdn.jtvnw.net') ||
                        str_contains($url, 'twitch.tv');

            case 'twitter.com':
            case 'x.com':
                return str_contains($url, 'pbs.twimg.com') ||
                        str_contains($url, 'twimg.com') ||
                        str_contains($url, 'twitter.com') ||
                        str_contains($url, 'x.com');

            case 'youtube.com':
                return str_contains($url, 'yt3.ggpht.com') ||
                        str_contains($url, 'googleusercontent.com') ||
                        str_contains($url, 'youtube.com');

            case 'instagram.com':
                return str_contains($url, 'cdninstagram.com') ||
                        str_contains($url, 'fbcdn.net') ||
                        str_contains($url, 'instagram.com');

            case 'facebook.com':
                return str_contains($url, 'fbcdn.net') ||
                        str_contains($url, 'facebook.com');

            case 'tiktok.com':
                return str_contains($url, 'tiktok.com') ||
                        str_contains($url, 'bytecdn.cn');

            default:
                return $this->isValidFaviconUrl($url);
        }
    }

    private function getSocialMediaDefaultFavicon(string $domain): string
    {
        $defaultIcons = [
            'twitch.tv' => '/images/default-social/twitch.png',
            'twitter.com' => '/images/default-social/twitter.png',
            'x.com' => '/images/default-social/twitter.png',
            'youtube.com' => '/images/default-social/youtube.png',
            'instagram.com' => '/images/default-social/instagram.png',
            'facebook.com' => '/images/default-social/facebook.png',
            'linkedin.com' => '/images/default-social/linkedin.png',
            'tiktok.com' => '/images/default-social/tiktok.png',
            'reddit.com' => '/images/default-social/reddit.png',
            'discord.com' => '/images/default-social/discord.png',
        ];

        return $defaultIcons[$domain] ?? $this->getDefaultFavicon($domain);
    }

    private function getDefaultFavicon(string $url): string
    {
        return $this->getFromGoogleService($url);
    }

    private function extractDomain(string $url): string
    {
        $parsed = parse_url($url);
        $host = $parsed['host'] ?? $url;
        return preg_replace('/^www\./', '', $host);
    }

    private function getBaseUrl(string $url): string
    {
        $parsed = parse_url($url);
        $scheme = $parsed['scheme'] ?? 'https';
        $host = $parsed['host'] ?? '';
        $port = isset($parsed['port']) ? ':' . $parsed['port'] : '';
        return "{$scheme}://{$host}{$port}";
    }

    private function resolveUrl(string $relativeUrl, string $baseUrl): string
    {
        if (str_starts_with($relativeUrl, 'http')) {
            return $relativeUrl;
        }

        if (str_starts_with($relativeUrl, '//')) {
            return 'https:' . $relativeUrl;
        }

        if (str_starts_with($relativeUrl, '/')) {
            return rtrim($baseUrl, '/') . $relativeUrl;
        }

        return $baseUrl . '/' . $relativeUrl;
    }

    private function checkUrlWithTimeout(string $url, int $timeout): bool
    {
        try {
            $response = $this->httpClient->head($url, [
                'headers' => [
                    'User-Agent' => $this->userAgent,
                    'Accept' => 'image/webp,image/apng,image/*,*/*;q=0.8'
                ],
                'timeout' => $timeout
            ]);

            return $response->getStatusCode() === 200 &&
                    $this->isValidImage($response);
        } catch (Exception $e) {
            return false;
        }
    }

    private function isValidImage(Response $response): bool
    {
        $contentType = $response->getHeaderLine('Content-Type');
        $contentLength = $response->getHeaderLine('Content-Length');

        $validTypes = [
            'image/x-icon', 'image/vnd.microsoft.icon',
            'image/png', 'image/jpeg', 'image/svg+xml',
            'image/webp', 'image/gif'
        ];

        $isImage = in_array($contentType, $validTypes) || str_starts_with($contentType, 'image/');

        $reasonableSize = !$contentLength || (int)$contentLength > 100;

        return $isImage && $reasonableSize;
    }

    private function isValidFaviconUrl(string $url): bool
    {
        return !str_contains($url, 'google.com/s2/favicons') &&
                !str_contains($url, 'duckduckgo.com/ip3/') &&
                filter_var($url, FILTER_VALIDATE_URL) !== false;
    }

    private function getFromGoogleService(string $url): string
    {
        return "https://www.google.com/s2/favicons?domain={$url}&sz=32";
    }
}
