<?php

use Facebook\WebDriver\WebDriverBy;

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

        $this->assertTrue(true);

        $this->takeScreenshot(getScreenshotPath(get_class($this) . '::PushTest'));
    }
}
