# Installing Visual Studio Code and AL Extensions

Visual Studio Code (VS Code) is the code editor we'll use to develop extensions for Microsoft Dynamics 365 Business Central using **AL (Application Language)**.

## Step 1: Download and Install VS Code

1. Visit the official [Visual Studio Code download page](https://code.visualstudio.com/download).
2. Download the installer for Windows.
3. Run the installer and follow the installation instructions.

## Step 2: Install the AL Language Extension

1. Open VS Code.
2. Click the **Extensions** icon in the Activity Bar on the left, or press `Ctrl + Shift + X`.
3. Search for `AL Language`.
4. Install **AL Language**, published by Microsoft.

![AL Language Extension](/al-language-extension.png)

This extension provides the core tools for Business Central development, including AL syntax support, IntelliSense, code diagnostics, and commands for downloading symbols, building packages, and publishing extensions.

## Step 3: Install Additional AL Development Extensions

### AZ AL Dev Tools / AL Code Outline

Search for **AZ AL Dev Tools/AL Code Outline** in the Extensions Marketplace and install it.

![AZ AL Dev Tools Extension](/az-al-dev-tools-extension.png)

This extension provides additional productivity tools for AL development, including code navigation and outlining features that make it easier to explore objects and move around large AL files.

It complements Microsoft's official AL extension rather than replacing it.

### Waldo's AL Language Extension

Search for **Waldo's AL Language Extension** and install it.

![Waldo's CRS AL Language Extension](/waldos-crs-al-language-extension.png)

This extension provides additional productivity features for AL developers, helping streamline common development tasks and improve the development workflow.

> **Note:** These additional extensions are optional. Start with Microsoft's official AL Language extension, then add third-party tools as needed. Review each extension's documentation and compatibility with your VS Code and AL versions before relying on it.