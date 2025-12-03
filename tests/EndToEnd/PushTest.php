<?php

use function Playwright\Testing\expect;

require_once __DIR__ . '/../helpers/TestHelper.php';

/**
 * Test main application functionality
 */
class PushTest extends TestHelper
{
    public function testPushAll(): void
    {
        $this->navigateTo('/push/?id=' . $_ENV['TEST_SPREADSHEET_ID']);

        expect($this->page->locator("#loadingTxt"))
          ->withTimeout(2 * 60 * 1000) // 2 minutes
          ->toContainText("All data published");

        $this->page->screenshot(getScreenshotPath(get_class($this) . '::PushTest'));
    }
}
