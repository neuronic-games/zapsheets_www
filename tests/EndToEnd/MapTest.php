<?php

use PHPUnit\Framework\Attributes\DependsExternal;
use function Playwright\Testing\expect;

require_once __DIR__ . '/../helpers/TestHelper.php';

/**
 * Test main application functionality
 */
class MapTest extends TestHelper
{
    #[DependsExternal('PushTest', 'testPushAll')]
    public function testIndex(): void
    {
        $this->navigateTo('/?id=' . $_ENV['TEST_SPREADSHEET_ID']);

        $this->waitForElement("#defaultScreen", 5 * 1000);

        $this->page->locator("#directoryContainer")->waitFor(['state' => 'visible']);

        $this->page->locator("#spinningLoader")->waitFor(['state' => 'hidden']);

        $this->page->locator("#splashScreen")->waitFor(['state' => 'hidden']);

        expect($this->page->locator("#mapListContainer div div:first-child"))
          ->withTimeout(20 * 1000)
          ->toContainText("Admissions");

        $this->page->screenshot(getScreenshotPath(get_class($this) . '::MapTest'));
    }
}
