# Automatic End-to-end Testing

The project includes end-to-end tests using php-webdriver (geckodriver) and PHPUnit.

## Setup

### 1. Install geckodriver

#### Ubuntu/Debian:
```bash
sudo apt-get update
sudo apt-get install firefox-geckodriver
```

#### macOS:
```bash
brew install geckodriver
```

#### Windows:
Download from: https://github.com/mozilla/geckodriver/releases

#### Other Linux:
```bash
# Download the latest release
wget https://github.com/mozilla/geckodriver/releases/download/v0.33.0/geckodriver-v0.33.0-linux64.tar.gz
tar -xvzf geckodriver-*.tar.gz
chmod +x geckodriver
sudo mv geckodriver /usr/local/bin/
```

### 2. Set up configuration

Make sure the following environment variables are set in `.env.testing`:

```
TEST_SERVER_URL=http://localhost:8000
TEST_SPREADSHEET_ID=your_test_spreadsheet_id
```

## Running Tests

### Start PHP Development Server

```bash
composer serve
```

### Run E2E Tests

```bash
# Run all E2E tests
composer test-e2e

# Or run directly
cd tests && ../vendor/bin/phpunit
```

## Configuration

The WebDriver configuration is defined in `tests/bootstrap.php`:

```php
define('WEBDRIVER_BROWSER_OPTIONS', [
    'headless' => true, // Set to false for debugging
    'timeout' => 30000,
    'viewport' => ['width' => 1280, 'height' => 720],
    'browser' => 'firefox',
]);
```

## Debugging

### Running in Headed Mode

To see the browser during tests, set `headless` to false in `tests/bootstrap.php`:

```php
'headless' => false,
```

## Browser Support

The default configuration uses Firefox with geckodriver. To use other browsers, update the TestHelper class:

- Chrome: Use `DesiredCapabilities::chrome()` with ChromeDriver
- Edge: Use `DesiredCapabilities::microsoftEdge()` with MSEdgeDriver
- Safari: Use `DesiredCapabilities::safari()` with safaridriver (macOS only)

Note: Each browser requires its own WebDriver executable to be installed. The direct connection approach used here works best with geckodriver/Firefox. For other browsers, you may need to use Selenium Server.
