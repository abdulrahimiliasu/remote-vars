# Set Remote Vars

This extension helps push all local enviroment/config variables to a remote server usung a specific `cli command`, wwithout needing to copy and paste into the browser or do it manually with the `cli` via the terminal.

## Features

- Push all local variables to remote server at once, by running a command on all variables found.

## Requirements

- Install and login to the `CLI` you would like to use.
- Create a `remote.vars.config` file in the project directory and paste all variables you want to push to remote server there

## How to use this extension

- Press `Shift` + `Cmd` + `P` to open the command window in vs code
- Go to Extension Settings, set and save the command to execute.
- Run `Set Remote Vars: Set Var` command

<br>

> Note: This extension does not read your local `.env` file, it rather uses a `remote.vars.config` file to look for all local variables. Please make sure to add all variables you want to push to remote server in that configuration file.

## Extension Settings

This extension contributes the following settings:

- `setRemoteVars.command`: Save command to run when pushing vars (must contain `%var%` in place of variable).
- `setRemoteVars.delimeter`: The delimeter to use in when formatting your command e.g `:` wiil be `$your-command YOUR:VAR` i.e command field is like `$your-command %var%`

## Release Notes

First release version

### 1.0.0

---
