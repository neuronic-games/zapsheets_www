# Zapsheets Maps / WWW

## Local development

1. Clone the repository, e.g. `git clone git@github.com:neuronic-games/zapsheets_www.git`
2. Install PHP, Python, Python Virtualenv, PHP Composer
3. Make a Python virtualenv, activate it, run `pip install -r requirements.txt` to install `gspread`
4. Run `composer install` to install `phpdotenv` and test dependencies
5. Get `credentials.json` and a sheet ID from other team members
6. Launch a local PHP server, `composer serve`
7. Visit `http://localhost:8000/push/?id=<SHEET ID>` (replace `<SHEET ID>` with the sheet ID from step #4)
8. Wait for it to sync stuff, make sure that a new `sheets` directory appears
9. Visit `http://localhost:8000?id=<SHEET ID>` (replace `<SHEET ID>` with the sheet ID from step #4)

See [`README.testing.md`](./README.testing.md) for information about automated tests.
