# ZapSheets Signage

## Local development

We recommend running ZapSheets Signage on your own computer during development.

First, install Git and clone this repository:

```bash
git clone git@github.com:neuronic-games/zapsheets_www.git
```

### Install system dependencies

First, choose a method to install Python and PHP.

#### Dev Containers

##### Stand-alone command-line / `devcontainers-cli`

1. Install [`devcontainers-cli`](https://github.com/devcontainers/cli)
2. Run `devcontainers up --workspace-folder .`

Now, each time you want to work on ZapSheets Signage, run:

```bash
devcontainers exec --workspace-folder . bash
```

##### Visual Studio

1. Install Visual Studio Code
2. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
3. View » Command Palette, then type "Reopen" and choose "Dev Containers: Reopen in Container"

Now, when you open ZapSheets Signage in Visual Studio Code, either the dev container will launch automatically, or you'll see a prompt to start it.

#### Docker

1. Install Docker
2. Optional: run `docker build -t neuronicgames/zapsheets-dev .` to update the image

Now, each time you want to work on ZapSheets Signage, run:

```bash
docker run -it -p 8000:8000 -v"$PWD:/app:Z" neuronicgames/zapsheets-dev bas
```

#### "Bare metal"

1. Install PHP, Python, Pip, and PHP Composer
2. Make a Python virtualenv & activate it (e.g. `python -m venv .venv`)
Now, each time you want to work on ZapSheets Signage, run:

```bash
source .venv/bin/activate
```

### Install project dependencies

1. Run `composer install` to install PHP packages
2. Run `pip install -r requirements.txt` to install Python dependencies

Re-run these commands whenever `requirements.txt` or `composer.json` / `composer.lock` change.

### Configure settings and credentials

1. Copy `.env.example` to `.env`. If you need to specify a different Python path – for example, if you have different versions of Python installed, or you're using a Python Virtualenv, change `PYTHON` to point to the Python interpreter you want to use -- e.g. `PYTHON=.venv/bin/python3`
2. Request `credentials.json` from another team member, and save it in the root directory. It should have the same format as `credentials.json.example`

### Run the application

1. Launch a local PHP server, `composer serve`
2. Request a sheet ID from another team member
3. Visit <http://localhost:8000/push/?id=><SHEET ID> (replace `<SHEET ID>` with the sheet ID from step #2)
4. Wait for the page to complete – a new `sheets` directory should appear, and the message "All data published." should be displayed.
6. Visit <http://localhost:8000?id=><SHEET ID> (replace `<SHEET ID>` with the sheet ID from step #2)

## Development workflow

For each change to ZapSheets Signage:

1. Switch to the `main` git branch, `git switch main`
2. Sync changes from Github, `git pull`
3. Create a new branch for your changes, named using the format `<type>/<author>/<description>`, e.g. `feat/lucy/kiosk-themes`. For type, pick a [Conventional Branch](https://conventional-branch.github.io/) prefix.
4. Commit your changes to the branch.
5. After your first commit to the branch, push it to Github, `git push -u origin HEAD`
6. Continue making changes until you're satisfied that your work is ready, making commits and pushing as you go.
7. When you're ready, [submit a pull request](https://github.com/neuronic-games/zapsheets_www/compare)

## Testing

See [`README.testing.md`](./README.testing.md) for information about automated tests.

## Deployment

When pull requests are merged into `main`, changes will be automatically deployed to https://zapsheets.com/signage/.

You can [view the status of tests and deployments on Drone](https://drone.neuronicgames.com/neuronic-games/zapsheets_www)
