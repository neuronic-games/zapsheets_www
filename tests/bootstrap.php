<?php

// Set test environment
define('APP_ENV', 'testing');

// Set error reporting for tests
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Set timezone
date_default_timezone_set('UTC');

// Load environment variables for testing
if (file_exists(__DIR__ . '/../.env')) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
    $dotenv->load();
}

// Override with test-specific environment variables if .env.testing exists
if (file_exists(__DIR__ . '/../.env.testing')) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..', '.env.testing');
    $dotenv->load();
}

// Set required environment variables if not set
$_ENV['APP_ENV'] = $_ENV['APP_ENV'] ?? 'testing';
$_ENV['PYTHON'] = $_ENV['PYTHON'] ?? '/usr/bin/python3';

// Ensure test directories exist
$testDirs = [
    __DIR__ . '/fixtures',
    dirname(__DIR__) . '/sheets/test',
    dirname(__DIR__) . '/log/test'
];

foreach ($testDirs as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }
}

// Helper function for test server URL
if (!function_exists('getTestServerUrl')) {
    function getTestServerUrl()
    {
        return $_ENV['TEST_SERVER_URL'] ?? 'http://localhost:8000';
    }
}

// Helper function for screenshot path
if (!function_exists('getScreenshotPath')) {
    function getScreenshotPath($testName)
    {
        $screenshotDir = __DIR__ . '/screenshots';
        if (!is_dir($screenshotDir)) {
            mkdir($screenshotDir, 0777, true);
        }
        return $screenshotDir . '/' . $testName . '-' . date('Y-m-d_H-i-s') . '.png';
    }
}

// Configure Selenium WebDriver options with geckodriver
if (!defined('WEBDRIVER_BROWSER_OPTIONS')) {
    define('WEBDRIVER_BROWSER_OPTIONS', [
        'headless' => false, // Set to false for debugging
        'timeout' => 30000,
        'viewport' => ['width' => 1280, 'height' => 720],
        'browser' => 'firefox',
    ]);
}

// Include test helper classes
require_once __DIR__ . '/helpers/TestHelper.php';
