# Building, Publishing, and Running an Extension

When developing AL extensions for Business Central, we typically follow three steps: **build, publish, and run**.

## 1. Building an Extension

Building compiles your AL code and checks it for errors.

- The AL compiler checks your code against AL syntax and type rules.
- If compilation succeeds, it generates an `.app` package containing your extension.
- If errors are found, fix them before publishing.

**In VS Code:**
- Press `Ctrl + Shift + B` to build the project.

## 2. Publishing an Extension

Publishing deploys your extension to a Business Central environment, making its functionality available there.

When you publish an extension from VS Code, the development workflow builds and uploads the extension to the configured Business Central environment.

**In VS Code:**
- Press `Ctrl + F5` to publish and run without debugging.
- Press `F5` to publish and start a debugging session.

Publishing requires a correctly configured `launch.json` and access to the target environment.

## 3. Running an Extension

Running means executing the functionality provided by your extension.

**Important:** Publishing an extension does not automatically execute all its AL code.

For example, if your extension adds an action to the Customer List page, you must open that page and select the action to execute its code.

Triggers execute when their corresponding events occur. For example, `OnOpenPage()` executes when its page opens.

## Quick Summary

| Action | Purpose | VS Code shortcut |
|---|---|---|
| Build | Compile code and generate the extension package. | `Ctrl + Shift + B` |
| Publish without debugging | Deploy the extension and open the configured browser session when enabled. | `Ctrl + F5` |
| Publish with debugging | Deploy the extension and start a debugging session. | `F5` |
| Run functionality | Execute the extension's code through a trigger, action, or other execution mechanism. | Depends on the functionality |

## Further Reading

- [Getting started with AL — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-get-started)
- [Debugging AL code — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-debugging)
- [The `launch.json` file — Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-json-launch-file)