# Zapsheets Maps / WWW

## Local development

1. Clone the repository, e.g. `git clone git@github.com:neuronic-games/zapsheets_www.git`
2. Install PHP, Python, Python Virtualenv, PHP Composer
3. Make a Python virtualenv, activate it, run `pip install -r requirements.txt` to install `gspread`
4. Run `composer install` to install `phpdotenv` and test dependencies
5. Get `credentials.json` and a sheet ID from other team members
6. Launch a local PHP server, `php -S 0.0.0.0:8000`
7. Visit http://localhost:8000/push/?id=<SHEET ID> (replace `<SHEET ID>` with the sheet ID from step #4)
8. Wait for it to sync stuff, make sure that a new `sheets` directory appears
9. Visit http://localhost:8000?id=<SHEET ID> (replace `<SHEET ID>` with the sheet ID from step #4)

## E2E Testing

The project includes end-to-end tests using php-webdriver (geckodriver) and PHPUnit.

### Setup Requirements

#### 1. Install Dependencies

```bash
composer install
```

#### 2. Install geckodriver

##### Ubuntu/Debian:
```bash
sudo apt-get update
sudo apt-get install firefox-geckodriver
```

##### macOS:
```bash
brew install geckodriver
```

##### Windows:
Download from: https://github.com/mozilla/geckodriver/releases

##### Other Linux:
```bash
# Download the latest release
wget https://github.com/mozilla/geckodriver/releases/download/v0.33.0/geckodriver-v0.33.0-linux64.tar.gz
tar -xvzf geckodriver-*.tar.gz
chmod +x geckodriver
sudo mv geckodriver /usr/local/bin/
```

#### 3. Verify Setup

Make sure the following environment variables are set in `.env.testing`:

```
TEST_SERVER_URL=http://localhost:8000
TEST_SPREADSHEET_ID=your_test_spreadsheet_id
```

### Running Tests

#### Start PHP Development Server

```bash
php -S localhost:8000
```

#### Run E2E Tests

```bash
# Run all E2E tests
composer test-e2e

# Or run directly
cd tests && ../vendor/bin/phpunit
```

### Configuration

The WebDriver configuration is defined in `tests/bootstrap.php`:

```php
define('WEBDRIVER_BROWSER_OPTIONS', [
    'headless' => true, // Set to false for debugging
    'timeout' => 30000,
    'viewport' => ['width' => 1280, 'height' => 720],
    'browser' => 'firefox',
]);
```

### Debugging

#### Running in Headed Mode

To see the browser during tests, set `headless` to false in `tests/bootstrap.php`:

```php
'headless' => false,
```

#### Screenshots

Screenshots are automatically taken:
- When tests fail
- When explicitly called with `$this->takeScreenshot()`

Screenshots are saved to `tests/screenshots/`.

### Browser Support

The default configuration uses Firefox with geckodriver. To use other browsers, update the TestHelper class:

- Chrome: Use `DesiredCapabilities::chrome()` with ChromeDriver
- Edge: Use `DesiredCapabilities::microsoftEdge()` with MSEdgeDriver
- Safari: Use `DesiredCapabilities::safari()` with safaridriver (macOS only)

Note: Each browser requires its own WebDriver executable to be installed. The direct connection approach used here works best with geckodriver/Firefox. For other browsers, you may need to use Selenium Server.

### Troubleshooting

#### "geckodriver not found" error
Ensure geckodriver is installed and in your PATH. Test with:
```bash
geckodriver --version
```

#### "Firefox not found" error
Install Firefox:
```bash
# Ubuntu/Debian
sudo apt-get install firefox

# macOS
brew install firefox
```

#### Tests timeout
Increase the timeout value in `WEBDRIVER_BROWSER_OPTIONS`

#### Element not found
Check that your PHP development server is running and the application is accessible at TEST_SERVER_URL

#### Permission denied error
Make sure geckodriver has executable permissions:
```bash
chmod +x /usr/local/bin/geckodriver
```
