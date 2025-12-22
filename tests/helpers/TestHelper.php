<?php

use PHPUnit\Framework\TestCase;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\WebDriverBy;
use Facebook\WebDriver\WebDriverExpectedCondition;
use Facebook\WebDriver\Firefox\FirefoxOptions;
use Facebook\WebDriver\Firefox\FirefoxDriver;

/**
 * Base class for E2E tests using php-webdriver with geckodriver
 */
abstract class TestHelper extends TestCase
{
    protected $driver;
    protected $baseUrl;

    protected function setUp(): void
    {
        parent::setUp();

        $this->baseUrl = getTestServerUrl();

        // Initialize WebDriver with geckodriver
        $options = WEBDRIVER_BROWSER_OPTIONS;

        // Set up Firefox options
        $firefoxOptions = new FirefoxOptions();
        if ($options['headless']) {
            $firefoxOptions->addArguments(['-headless']);
        }

        // Set capabilities for Firefox
        $capabilities = DesiredCapabilities::firefox();
        $capabilities->setCapability(FirefoxOptions::CAPABILITY, $firefoxOptions);

        // Create WebDriver instance using geckodriver directly
        // This avoids the need for Selenium Server
        $this->driver = FirefoxDriver::start($capabilities);

        // Set window size
        $this->driver->manage()->window()->setSize(
            new \Facebook\WebDriver\WebDriverDimension(
                $options['viewport']['width'],
                $options['viewport']['height']
            )
        );

        // Set implicit wait
        $this->driver->manage()->timeouts()->implicitlyWait(10);
    }

    protected function tearDown(): void
    {
        // Take screenshot on test failure
        if (method_exists($this, 'getStatus') && $this->getStatus() === \PHPUnit\Runner\BaseTestRunner::STATUS_FAILURE) {
            $screenshotPath = getScreenshotPath(get_class($this) . '::' . $this->getName());
            $this->driver->takeScreenshot($screenshotPath);
            echo "Screenshot saved to: $screenshotPath";
        }

        // Clean up WebDriver resources
        if ($this->driver) {
            $this->driver->quit();
        }

        parent::tearDown();
    }

    /**
     * Navigate to a URL and wait for it to load
     */
    protected function navigateTo($path)
    {
        $url = rtrim($this->baseUrl, '/') . '/' . ltrim($path, '/');
        $this->driver->get($url);
    }

    /**
     * Wait for an element to be visible
     */
    protected function waitForElement($selector, $timeout = 5000)
    {
        $by = $this->getBySelector($selector);
        $this->driver->wait($timeout / 1000)->until(
            WebDriverExpectedCondition::visibilityOfElementLocated($by)
        );
        return $this->driver->findElement($by);
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
        $element->sendKeys($text);
    }

    /**
     * Get text content of an element
     */
    protected function getElementText($selector)
    {
        $element = $this->waitForElement($selector);
        return $element->getText();
    }

    /**
     * Wait for page to fully load
     */
    protected function waitForPageLoad()
    {
        $this->driver->wait()->until(
            WebDriverExpectedCondition::jsReturnsTrue("return document.readyState === 'complete'")
        );
    }

    /**
     * Check if element exists
     */
    protected function elementExists($selector)
    {
        $by = $this->getBySelector($selector);
        $elements = $this->driver->findElements($by);
        return count($elements) > 0;
    }

    /**
     * Wait for navigation to complete
     */
    protected function waitForNavigation()
    {
        $this->waitForPageLoad();
    }

    /**
     * Convert CSS selector to WebDriverBy object
     */
    private function getBySelector($selector)
    {
        // Handle simple CSS selectors
        if (strpos($selector, '#') === 0) {
            // ID selector
            $id = substr($selector, 1);
            return WebDriverBy::id($id);
        } elseif (strpos($selector, '.') === 0) {
            // Class selector
            $class = substr($selector, 1);
            return WebDriverBy::className($class);
        } else {
            // Default to CSS selector
            return WebDriverBy::cssSelector($selector);
        }
    }

    /**
     * Wait for element to be hidden
     */
    protected function waitForElementHidden($selector, $timeout = 5000)
    {
        $by = $this->getBySelector($selector);
        $this->driver->wait($timeout / 1000)->until(
            WebDriverExpectedCondition::invisibilityOfElementLocated($by)
        );
    }

    /**
     * Take a screenshot
     */
    protected function takeScreenshot($filename = null)
    {
        $path = $filename ?: getScreenshotPath(get_class($this) . '::' . $this->getName());
        $this->driver->takeScreenshot($path);
        return $path;
    }
}

