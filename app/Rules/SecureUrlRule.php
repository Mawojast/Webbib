<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Psr\Log\LoggerInterface;
use Psr\Log\NullLogger;

/**
 * Rule SucureUrl
 *
 * Checks url format
 * Checks if url has a dns entry
 * Checks if url exists
 */
class SecureUrlRule implements ValidationRule
{
    public function __construct(
        protected ?LoggerInterface $logger = null,
    ) {
        $this->logger ??= new NullLogger();
    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $validateUrlFormat = $this->validateUrlFormat($value);
        if ($validateUrlFormat !== true) {
            $this->logger->warning("Blocked URL (format): {$value} - {$validateUrlFormat}");
            $fail($validateUrlFormat);
            return;
        }

        $host = parse_url($value, PHP_URL_HOST);
        $validateDns = $this->validateDns($host);
        if ($validateDns !== true) {
            $this->logger->warning("Blocked URL (dns): {$value} - {$validateDns}");
            $fail($validateDns);
            return;
        }

        $verifyUrlExists = $this->verifyUrlExists($value);
        if ($verifyUrlExists !== true) {
            $this->logger->warning("Blocked URL (http): {$value} - {$verifyUrlExists}");
            $fail($verifyUrlExists);
            return;
        }
    }

    protected function validateUrlFormat(string $url): string|bool
    {
        if (filter_var($url, FILTER_VALIDATE_URL) === false) {
            return "The url field must be a valid URL. (https://wikipedia.com)";
        }

        $scheme = parse_url($url, PHP_URL_SCHEME);
        if (!in_array(strtolower($scheme), ['https'], true)) {
            return "Only secure https:// url allowed";
        }

        $port = parse_url($url, PHP_URL_PORT);
        if ($port !== null && $port !== 443) {
            return "Only secure https:// url allowed.";
        }

        $host = parse_url($url, PHP_URL_HOST);
        if ($host === null) {
            return "The url field must be a valid URL. (https://wikipedia.com)";
        }

        if (parse_url($url, PHP_URL_USER) !== null || parse_url($url, PHP_URL_PASS) !== null) {
            return "The url field must be a valid URL. (https://wikipedia.com)";
        }

        return true;
    }

    protected function validateDns(string $host): string|bool
    {
        $recordsA = [];
        if (dns_check_record($host, "A")){
            $recordsA = dns_get_record($host, DNS_A);
        }

        $recordsAAAA = [];
        if (empty($recordsA) && dns_check_record($host, "AAAA") && !$recordsA ) {
            $recordsAAAA = dns_get_record($host, DNS_AAAA);
        }

        $records = array_merge($recordsA ?: [], $recordsAAAA ?: []);

        if (empty($records)) {
            return "The url field must be a valid URL.";
        }

        foreach ($records as $record) {
            $ip = $record['ip'] ?? $record['ipv6'] ?? null;
            if ($ip === null) {
                continue;
            }

            if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false) {
                return "The url field must be a valid URL.";
            }
        }

        return true;
    }

    protected function verifyUrlExists(string $url): string|bool
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_NOBODY, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);

        curl_exec($ch);
        $response = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if (empty($response) && $response === 404) {
            return "URL is not found.";
        }

        return true;
    }
}
