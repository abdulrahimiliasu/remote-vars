import { ExtensionContext, workspace, window, WorkspaceConfiguration, StatusBarAlignment, OutputChannel } from "vscode";

export class ActivateExtenstion {
  private outputChannel: OutputChannel = window.createOutputChannel("Set Remote Vars");
  private configs: WorkspaceConfiguration;

  constructor(public context: ExtensionContext) {
    this.configs = workspace.getConfiguration();
    this.createStatusBar();
  }

  getCommad(): string | undefined {
    const command = this.configs.get<string>("ConfigVars.CommandToRun");
    if (!command) {
      this.outputChannel.appendLine("Command not found in settings !");
    }

    return command;
  }

  getDelimeter(): string | undefined {
    const delimeter = this.configs.get<string>("ConfigVars.VariableDelimeter");
    return delimeter;
  }

  private createStatusBar(): void {
    const statusBar = window.createStatusBarItem(StatusBarAlignment.Right, 100);

    statusBar.tooltip = "Run Set Remote Vars";
    statusBar.text = "Set Remote Vars";
    statusBar.command = "set-remote-vars.set-vars";
    this.context.subscriptions.push(statusBar);
    statusBar.show();
  }
}
