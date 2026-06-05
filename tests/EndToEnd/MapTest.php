<?php

namespace ZapSheets\Tests\EndToEnd;

use PHPUnit\Framework\Attributes\DependsExternal;
use Facebook\WebDriver\WebDriverBy;
use ZapSheets\Tests\helpers\TestHelper;

/**
 * Test main application functionality
 */
class MapTest extends TestHelper
{
    #[DependsExternal('ZapSheets\Tests\EndToEnd\PushTest', 'testPushAll')]
    public function testIndex(): void
    {
        $this->navigateTo('/?id=' . $_ENV['TEST_SPREADSHEET_ID']);

        $this->waitForElement("#defaultScreen", 5 * 1000);

        $this->driver->wait(20)->until(
            function ($driver) {
                $directoryContainer = $driver->findElements(WebDriverBy::id("directoryContainer"));
                $spinningLoader = $driver->findElements(WebDriverBy::id("spinningLoader"));
                $splashScreen = $driver->findElements(WebDriverBy::id("splashScreen"));

                return count($directoryContainer) > 0
                       && $directoryContainer[0]->isDisplayed()
                       && (count($spinningLoader) === 0 || !$spinningLoader[0]->isDisplayed())
                       && (count($splashScreen) === 0 || !$splashScreen[0]->isDisplayed());
            },
        );

        $mapListElement = $this->waitForElement("#mapListContainer", 20 * 1000);
        $mapListText = $mapListElement->getText();

        $this->assertStringContainsString("Admissions", $mapListText);

        $this->takeScreenshot();
    }
}
