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

The project includes end-to-end tests using Playwright PHP driver and PHPUnit.

### Setting up E2E Tests

1. After running `composer install`, install Playwright browsers:
   ```bash
   cd vendor/playwright-php && npx playwright install chromium
   ```

2. Configure test environment (optional):
   ```bash
   cp .env.testing.example .env.testing
   # Edit .env.testing with your test configuration
   ```

### Running E2E Tests

1. Start the PHP development server in one terminal:
   ```bash
   php -S localhost:8000
   ```

2. Run tests in another terminal:
   ```bash
   # Using composer script
   composer test-e2e
   
   # Or using PHPUnit directly
   cd tests && ../vendor/bin/phpunit
   ```

Test results and screenshots (on failure) are saved in the `tests/screenshots` directory.
