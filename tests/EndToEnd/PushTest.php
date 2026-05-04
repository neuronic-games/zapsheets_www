<?php

namespace ZapSheets\Tests\EndToEnd;

use Facebook\WebDriver\WebDriverBy;
use ZapSheets\Tests\helpers\TestHelper;

require_once __DIR__ . '/../helpers/TestHelper.php';

/**
 * Test push interface functionality
 */
class PushTest extends TestHelper
{
    public function testPushAll(): void
    {
        $this->navigateTo('/push/?id=' . $_ENV['TEST_SPREADSHEET_ID']);

        $this->driver->wait(180)->until(
            function ($driver) {
                $loadingElements = $driver->findElements(WebDriverBy::id("loadingTxt"));
                if (count($loadingElements) === 0) {
                    return false;
                }

                $loadingText = $loadingElements[0]->getText();
                return strpos($loadingText, "All data published") !== false;
            }
        );

        $sheetDir = dirname(__DIR__, 2) . '/sheets/' . $_ENV['TEST_SPREADSHEET_ID'] . '/live';

        $settings = json_decode(file_get_contents($sheetDir . '/settings.json'), true);
        $bgImageUrl = null;
        foreach ($settings as $setting) {
            if ($setting['Name'] === 'BackgroundImage') {
                $bgImageUrl = $setting['Value'];
                break;
            }
        }
        $this->assertNotEmpty($bgImageUrl, 'BackgroundImage URL not found in settings');

        $bgCachePath = $sheetDir . '/cacheImages/bg.png';
        $this->assertFileExists($bgCachePath, 'Cached background image not found');

        $sourceContent = file_get_contents($bgImageUrl);
        $this->assertNotEmpty($sourceContent, 'Failed to download BackgroundImage from source');

        $this->assertSame(
            sha1($sourceContent),
            sha1_file($bgCachePath),
            'Cached background image hash does not match source',
        );

        $this->takeScreenshot();
    }
}
