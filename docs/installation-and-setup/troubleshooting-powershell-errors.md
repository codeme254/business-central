# Troubleshooting: BcContainerHelper Module Loading Errors

## Problem

When running a Business Central setup command such as:

```powershell
Get-BcArtifactUrl
```

PowerShell returns an error similar to:

```text
Get-BcArtifactUrl : The 'Get-BcArtifactUrl' command was found in the
module 'BcContainerHelper', but the module could not be loaded.
For more information, run 'Import-Module BcContainerHelper'.
```

Attempting to import the module directly:

```powershell
Import-Module BcContainerHelper
```

Produces the following error:

```text
Import-Module : File C:\Program Files\WindowsPowerShell\Modules\BcContainerHelper\6.1.19\BcContainerHelper.psm1
cannot be loaded because running scripts is disabled on this system.
```

## Cause

PowerShell's execution policy prevents the `BcContainerHelper` module from loading.

The module is installed, but PowerShell cannot execute its script files because of the current execution policy.

**Important:** This is a PowerShell configuration issue, not necessarily a problem with the module installation.

## Solution

### Step 1: Check the current execution policy

Open Windows PowerShell and run:

```powershell
Get-ExecutionPolicy -List
```

This displays the execution policies configured at different scopes, including the current user and local machine.

### Step 2: Update the execution policy for the current user

Run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

If prompted for confirmation, enter `Y`.

**Why `RemoteSigned`?**

This policy allows locally created scripts to run without a digital signature. Scripts downloaded from the internet generally require a trusted digital signature unless their downloaded-file mark has been removed.

Using `CurrentUser` limits the configuration change to the current Windows user instead of changing the policy for all users on the machine.

> **Note:** If your organization enforces an execution policy through Group Policy, that policy may override your setting. Follow your organization's requirements rather than attempting to bypass its restrictions.

### Step 3: Import BcContainerHelper

After updating the execution policy, run:

```powershell
Import-Module BcContainerHelper -Verbose
```

The `-Verbose` parameter displays additional information about the module-loading process, which can help with troubleshooting.

### Step 4: Verify that the module loaded successfully

Run:

```powershell
Get-Command Get-BcArtifactUrl
```

If the import succeeds, PowerShell should display information about the command, including its source module.

You can also check the installed module:

```powershell
Get-Module BcContainerHelper -ListAvailable
```

### Step 5: Retry the original command

Run:

```powershell
Get-BcArtifactUrl
```

If the module loads correctly, the original module-loading error should no longer occur.

## Troubleshooting Checklist

If the problem persists, verify the following:

- [ ] `BcContainerHelper` is installed.
- [ ] The installed module's files are present.
- [ ] The PowerShell execution policy permits the module's script files to run.
- [ ] The module imports successfully using `Import-Module BcContainerHelper`.
- [ ] `Get-Command Get-BcArtifactUrl` recognizes the command.
- [ ] No organization-managed execution policy is preventing the change.

To inspect the PowerShell version, run:

```powershell
$PSVersionTable
```

To inspect the installed module versions and their locations, run:

```powershell
Get-Module BcContainerHelper -ListAvailable |
    Select-Object Name, Version, ModuleBase
```

## Key Takeaway

When PowerShell recognizes a command but cannot load its associated module, do not immediately reinstall the module.

First, inspect the underlying error. If it indicates that script execution is disabled, investigate the execution policy before changing or reinstalling other components.

## Further Reading

- [PowerShell execution policies — Microsoft Learn](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies)
- [Import-Module — Microsoft Learn](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/import-module)
- [BcContainerHelper — Official GitHub repository](https://github.com/microsoft/navcontainerhelper)
- [Get-BcArtifactUrl — BcContainerHelper documentation](https://github.com/microsoft/navcontainerhelper/blob/master/Module/BcContainerHelper/Artifacts/Get-BcArtifactUrl.ps1)