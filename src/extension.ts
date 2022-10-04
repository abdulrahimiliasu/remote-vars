import * as vscode from "vscode";
import { ExecuteExtension } from "./execution/ExecuteExtension";
import { ActivateExtenstion } from "./activate/ActivateExtenstion";
import { Validator } from "./execution/Validator";

export function activate(context: vscode.ExtensionContext) {
  const activationProcess = new ActivateExtenstion(context);
  const validator = new Validator(context);
  const executionProcess = new ExecuteExtension(activationProcess, validator);

  let disposable = vscode.commands.registerCommand("set-remote-vars.set-vars", async () => {
    executionProcess.pushVars();
  });

  context.subscriptions.push(disposable);
}
