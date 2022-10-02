import { ExtensionContext, window } from "vscode";

export class Validator {
  constructor(context: ExtensionContext) {}

  validateVars(vars: string[]): boolean {
    if (vars.length === 0) {
      window.showErrorMessage("No Configured Vars were found !");
      return false;
    }

    return true;
  }

  validateCommand(command: string | undefined): boolean {
    if (!command) {
      const a = window.showErrorMessage("Command can not be empty !");
      return false;
    }
    if (!command.includes("%var%")) {
      window.showErrorMessage("Command must contain %var% symbol !");
      return false;
    }
    return true;
  }
}
