<?php

namespace ZapSheets\Tests\Integration;

use PHPUnit\Framework\TestCase;

class SaveLogTest extends TestCase
{
    private string $spreadsheetId = 'test_savelog';
    private string $sessionId;
    private string $testServerUrl;

    protected function setUp(): void
    {
        parent::setUp();
        $this->sessionId = 'test-' . bin2hex(random_bytes(8));
        $this->testServerUrl = getTestServerUrl();
        $this->cleanupLogFile();
    }

    protected function tearDown(): void
    {
        $this->cleanupLogFile();
        parent::tearDown();
    }

    public function testSaveLogCreatesExpectedJsonFile(): void
    {
        $postData = http_build_query([
            'id' => $this->spreadsheetId,
            'sheet_version' => '1.0',
            'sheet_title' => 'Test Sheet',
            'app_version' => '2.0',
            'poll_time' => '2024-01-01 12:00:00',
            'kiosk_location' => 'Test Room',
            'session_uuId' => $this->sessionId,
            'kiosk' => 'K1',
            'memory_used' => '1.23 MB',
        ]);

        $context = stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
                'content' => $postData,
            ],
        ]);

        $response = file_get_contents(
            $this->testServerUrl . '/saveLog.php',
            false,
            $context
        );

        $this->assertSame('log data saved', $response);

        $logFilePath = dirname(__DIR__, 2) . '/log/' . $this->spreadsheetId . '/' . $this->sessionId . '.json';
        $this->assertFileExists($logFilePath);

        $logContent = json_decode(file_get_contents($logFilePath), true);
        $this->assertIsArray($logContent);
        $this->assertCount(1, $logContent);

        $entry = $logContent[0];
        $this->assertSame('2024-01-01 12:00:00', $entry['Poll On']);
        $this->assertSame($this->spreadsheetId, $entry['Sheet Id']);
        $this->assertSame('1.0', $entry['Sheet Version']);
        $this->assertSame('Test Sheet', $entry['Sheet Title']);
        $this->assertSame('2.0', $entry['App Version']);
        $this->assertSame($this->sessionId, $entry['Device Session Id']);
        $this->assertSame('K1', $entry['Kiosk']);
        $this->assertSame('Test Room', $entry['Kiosk Location']);
        $this->assertSame('1.23 MB', $entry['Momery Usage']);
    }

    private function cleanupLogFile(): void
    {
        $logDir = dirname(__DIR__, 2) . '/log/' . $this->spreadsheetId;
        if (is_dir($logDir)) {
            $this->deleteDirectory($logDir);
        }
    }

    private function deleteDirectory(string $dir): void
    {
        if (!is_dir($dir)) {
            return;
        }
        $items = scandir($dir);
        foreach ($items as $item) {
            if ($item === '.' || $item === '..') {
                continue;
            }
            $path = $dir . '/' . $item;
            if (is_dir($path)) {
                $this->deleteDirectory($path);
            } else {
                unlink($path);
            }
        }
        rmdir($dir);
    }
}
