# Installing Business Central On-Premises Using Docker Desktop

We can run Microsoft Dynamics 365 Business Central on-premises inside a Docker container. This allows us to practice AL development without setting up the entire environment manually on Windows.

**Limitation:** Unlike Business Central online, a local on-premises installation does not provide the online Business Central admin center. However, it supports much of the development functionality needed to learn AL.

## Step 1: Install Docker Desktop

Install Docker Desktop using the appropriate Windows installation tutorial.

### Enable Windows Containers

Business Central on-premises containers use **Windows containers**, which run Windows-based applications in isolated environments. Docker must therefore be configured to support Windows containers rather than Linux containers.

Once Docker Desktop is installed:

1. Run Docker Desktop as an administrator.
2. Wait for the Docker engine to start.
3. Find the Docker icon in the Windows system tray.
4. Right-click the icon and select **Switch to Windows containers**.

> **Note:** Windows containers require compatible Windows features and system configuration. If Docker reports that Windows container support is unavailable, run the commands in the "Enabling Windows Features" section below.

## Step 2: Install BCContainerHelper

**BCContainerHelper** is a PowerShell module that simplifies creating and managing Business Central Docker containers. It provides commands for downloading Business Central artifacts, creating containers, and performing common development and administration tasks.

Open PowerShell ISE as an administrator and run:

```powershell
Install-Module BCContainerHelper -Force
```

This installs the module. The `-Force` parameter allows the installation to proceed without some interactive prompts.

To display an introduction to the module and its available functions, run:

```powershell
Write-BCContainerHelperWelcomeText
```

See [troubleshooting powershell errors](/installation-and-setup/troubleshooting-powershell-errors.md) section if this doesn't work.

## Step 3: List and Retrieve Business Central Artifacts

### What are artifacts?

**Business Central artifacts** are the installation files and related resources for a particular Business Central version, including the files needed to create a container.

BCContainerHelper uses artifact URLs to identify which version and localization of Business Central to install.

For example, `w1` represents the worldwide localization.

### List available artifacts

Run the following command to list all available on-premises artifacts for the worldwide localization:

```powershell
Get-BcArtifactUrl -type OnPrem -country w1 -select All
```

### Retrieve the latest artifact URL

To retrieve the URL for the latest available on-premises artifact for the worldwide localization, run:

```powershell
Get-BcArtifactUrl -type OnPrem -country w1 -select Latest
```

The returned URL identifies the artifact that will be used when creating the container.

**Important:** The latest artifact changes as Microsoft releases new versions. You can use a specific artifact URL when you need to work with a particular version.

## Step 4: Create the Business Central Docker Container

Open a new PowerShell script (`.ps1`) in PowerShell ISE and enter the following code:

```powershell
$password = '1234'

$securePassword = ConvertTo-SecureString `
    -String $password `
    -AsPlainText `
    -Force

$artifactUrl = "https://bcartifacts-exdbf9fwegejdqak.b02.azurefd.net/onprem/29.0.54011.55407/w1"

$containerName = "bcserv"

$credential = New-Object pscredential 'admin', $securePassword

New-BcContainer `
    -accept_eula `
    -accept_outdated `
    -updateHosts `
    -artifactUrl $artifactUrl `
    -containerName $containerName `
    -credential $credential `
    -auth UserPassword `
    -shortcuts StartMenu `
    -memoryLimit 8G `
    -alwaysPull
```

Run the script and allow the process to complete. Creating a container may take considerable time because the required images and artifacts must be downloaded and configured.

### Understanding the script

**1. Define the password and credentials**

```powershell
$password = '1234'

$securePassword = ConvertTo-SecureString `
    -String $password `
    -AsPlainText `
    -Force

$credential = New-Object pscredential 'admin', $securePassword
```

These commands define the password and create credentials for the Business Central user.

`ConvertTo-SecureString` converts the plain-text password into a PowerShell secure string, which is then used to construct the credentials.

*Security note:* The password above is for demonstration only. Use a stronger password for your own environment, and avoid hardcoding real credentials in scripts.

**2. Specify the artifact URL**

```powershell
$artifactUrl = "https://bcartifacts-exdbf9fwegejdqak.b02.azurefd.net/onprem/29.0.54011.55407/w1"
```

This identifies the Business Central version and localization to install. Here, the URL points to version `29.0.54011.55407`, worldwide localization.

**3. Specify the container name**

```powershell
$containerName = "bcserv"
```

This assigns the name `bcserv` to the container, making it easier to identify and manage in Docker Desktop.

**4. Create the container**

The `New-BcContainer` command creates and configures the Business Central environment.

| Parameter | Purpose |
|---|---|
| `-accept_eula` | Accepts the applicable license terms. |
| `-accept_outdated` | Allows the use of artifacts that BCContainerHelper considers outdated. |
| `-updateHosts` | Updates the Windows hosts file to support resolving the container's hostname. |
| `-artifactUrl` | Specifies the Business Central artifact to install. |
| `-containerName` | Sets the container's name. |
| `-credential` | Supplies the credentials used to configure the environment. |
| `-auth UserPassword` | Configures username-and-password authentication. |
| `-shortcuts StartMenu` | Creates Start Menu shortcuts for convenient access. |
| `-memoryLimit 8G` | Sets the container's memory limit to 8 GB. |
| `-alwaysPull` | Instructs the helper to pull the required image rather than relying solely on a locally available copy. |

The backtick (`` ` ``) at the end of each line continues the PowerShell command onto the next line.

**Troubleshooting tip:** Downloading artifacts and creating the container can take time and consume significant bandwidth. If the operation times out, investigate the error and network connection before assuming that the computer lacks sufficient resources.

## Step 5: Open Business Central

Once the container has been created successfully:

1. Open Docker Desktop.
2. Locate the container named `bcserv`.
3. Confirm that the container is running.
4. Open the container's details and locate the Business Central web client URL.

![Running BC Container](/running-bc-container.png)

5. Open the URL in your browser.
6. Sign in using the username and password configured in Step 4.

If the web client loads and you can sign in, your local Business Central environment is ready to use.

## Enabling Windows Features

During troubleshooting, the following PowerShell command was used:

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName $("Microsoft-Hyper-V", "Containers") -All
```

This command enables two Windows optional features:

- **Microsoft-Hyper-V:** Provides Microsoft's virtualization technology, which can support the virtualized infrastructure required by some container configurations.
- **Containers:** Enables Windows container functionality.

The parameters mean:

| Parameter | Purpose |
|---|---|
| `-Online` | Applies the change to the currently running Windows installation. |
| `-FeatureName` | Specifies the Windows features to enable. |
| `-All` | Also enables any required parent features. |

**Important:** Run this command in an elevated PowerShell session. Enabling these features may require a Windows restart. Hyper-V also has hardware and Windows edition requirements.

This command is a troubleshooting measure, not a command that must be run on every machine. Verify which feature is missing before changing your Windows configuration.