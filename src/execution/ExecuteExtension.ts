import { ActivateExtenstion } from "./../activate/ActivateExtenstion";
import { Validator } from "./Validator";
import { workspace, window, ProgressLocation, Uri, Terminal, InputBoxOptions } from "vscode";

export class ExecuteExtension {
  private terminal: Terminal = window.createTerminal("Remote Vars");

  constructor(private activationProcess: ActivateExtenstion, private validator: Validator) {}

  async getDotEnvVars(delemiter: string = "="): Promise<string[]> {
    const vars = await this.readDotEnvContent();
    let formattedVars = vars.map((v) => v.replace("=", delemiter));
    return formattedVars;
  }

  async readDotEnvContent(): Promise<string[]> {
    const path = workspace.workspaceFolders![0].uri.path;
    const uri = Uri.file(`${path}/remote-vars.config`);

    try {
      const config = await workspace.openTextDocument(uri);
      const vars = config.getText().split("\n");
      return vars;
    } catch (error) {
      window.showErrorMessage("Couldn't read remote-vars.config file: " + error);
      return [];
    }
  }

  async pushVars() {
    let command = this.activationProcess.getCommad();
    const delimeter = this.activationProcess.getDelimeter();
    const vars = await this.getDotEnvVars(delimeter);

    if (!command) {
      const cmd = await window.showInputBox({ title: "Type in command to run", placeHolder: "$your-cli-command (use %var% in place of variable)" });
      command = cmd;
    }

    const isValidVars = this.validator.validateVars(vars);
    const isValidCommand = this.validator.validateCommand(command);

    if (!isValidVars || !isValidCommand) {
      return;
    }

    window.onDidOpenTerminal(this.handleTerminal);

    window.withProgress({ title: "Set Remote Vars: Running Command", location: ProgressLocation.Notification }, (progres, token) => {
      this.terminal.show();

      vars.forEach((configVar) => {
        const terminalCmd = command!.replace("%var%", configVar);
        this.terminal.sendText(terminalCmd);
      });

      return new Promise((resolve, reject) => {
        resolve(() => {});
      });
    });
  }

  handleTerminal(event: Terminal) {
    if (!event.state.isInteractedWith) {
      window.showInformationMessage("Finished Running Commands !");
      this.terminal.hide();
    }
  }
}
