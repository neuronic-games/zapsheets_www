# ZapSheets Signage

[![Build Status](https://drone.neuronicgames.com/api/badges/neuronic-games/zapsheets_www/status.svg)](https://drone.neuronicgames.com/neuronic-games/zapsheets_www)

## Local development

1. Clone the repository, e.g. `git clone git@github.com:neuronic-games/zapsheets_www.git`
2. Install PHP, Python, Python Virtualenv, PHP Composer
3. Make a Python virtualenv, activate it, run `pip install -r requirements.txt` to install `gspread`
4. Run `composer install` to install `phpdotenv`
5. Copy `.env.example` to `.env`. If you need to specify a different Python path – for example, if you have different versions of Python installed, or you're using a Python Virtualenv, change `PYTHON` to point to the Python interpreter you want to use
6. Get `credentials.json`, and a sheet ID, from other team members
7. Launch a local PHP server, `composer serve`
8. Visit http://localhost:8000/push/?id=<SHEET ID> (replace `<SHEET ID>` with the sheet ID from step #4)
9. Wait for the page to complete – a new `sheets` directory should appear, and the message "All data published." should be displayed.
10. Visit http://localhost:8000?id=<SHEET ID> (replace `<SHEET ID>` with the sheet ID from step #4)

See [`README.testing.md`](./README.testing.md) for information about automated tests.
