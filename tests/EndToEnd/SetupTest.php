<?php

require_once __DIR__ . '/../helpers/TestHelper.php';

/**
 * Basic test to verify Playwright setup is working
 */
class SetupTest extends TestHelper
{
    public function testPlaywrightCanLaunch()
    {
        $this->navigateTo('/');
        
        // Check if page loaded without errors
        $title = $this->page->title();
        $this->assertNotEmpty($title);
        $this->assertStringContainsStringIgnoringCase('map', $title);
    }
}