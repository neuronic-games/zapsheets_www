<?php

use PHPUnit\Framework\TestCase;
use Playwright\Playwright;

/**
 * Base class for E2E tests using Playwright
 */
abstract class TestHelper extends TestCase
{
    protected $context;
    protected $page;
    protected $baseUrl;
    
    protected function setUp(): void
    {
        parent::setUp();
        
        $this->baseUrl = getTestServerUrl();
        
        // Initialize Playwright
        $options = PLAYWRIGHT_BROWSER_OPTIONS;
        $this->context = Playwright::chromium([
            'headless' => $options['headless'],
            'slowMo' => 0
        ]);
        
        $this->page = $this->context->newPage();
        
        // Set viewport size
        $this->page->setViewportSize($options['viewport']['width'], $options['viewport']['height']);
        
        // Set default timeout
        // Note: Playwright PHP may have different method for timeout
    }
    
    protected function tearDown(): void
    {
        // Take screenshot on test failure
        if (method_exists($this, 'getStatus') && $this->getStatus() === \PHPUnit\Runner\BaseTestRunner::STATUS_FAILURE) {
            $screenshotPath = getScreenshotPath(get_class($this) . '::' . $this->getName());
            $this->page->screenshot(['path' => $screenshotPath]);
            echo "Screenshot saved to: $screenshotPath";
        }
        
        // Clean up Playwright resources
        if ($this->page) {
            $this->page->close();
        }
        
        if ($this->context) {
            $this->context->close();
        }
        
        parent::tearDown();
    }
    
    /**
     * Navigate to a URL and wait for it to load
     */
    protected function navigateTo($path)
    {
        $url = rtrim($this->baseUrl, '/') . '/' . ltrim($path, '/');
        $this->page->goto($url);
    }
    
    /**
     * Wait for an element to be visible
     */
    protected function waitForElement($selector, $timeout = 5000)
    {
        return $this->page->waitForSelector($selector, ['timeout' => $timeout]);
    }
    
    /**
     * Click on an element
     */
    protected function clickElement($selector)
    {
        $element = $this->waitForElement($selector);
        $element->click();
    }
    
    /**
     * Type text into an input field
     */
    protected function typeText($selector, $text)
    {
        $element = $this->waitForElement($selector);
        $element->fill($text);
    }
    
    /**
     * Get text content of an element
     */
    protected function getElementText($selector)
    {
        $element = $this->waitForElement($selector);
        return $element->textContent();
    }
    
    /**
     * Wait for page to fully load
     */
    protected function waitForPageLoad()
    {
        $this->page->waitForLoadState('networkidle');
    }
    
    /**
     * Check if element exists
     */
    protected function elementExists($selector)
    {
        return $this->page->locator($selector)->count() > 0;
    }
    
    /**
     * Wait for navigation to complete
     */
    protected function waitForNavigation()
    {
        $this->page->waitForLoadState();
    }
}