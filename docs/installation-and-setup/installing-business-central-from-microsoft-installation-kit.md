# Installing Business Central from the Microsoft Installation Kit

This method installs Business Central directly on Windows using Microsoft's installation media, rather than running it inside a Docker container.

## Prerequisites

Before starting, ensure that you have:

- **SQL Server:** Installed with the **Full-Text and Semantic Extractions for Search** feature enabled. This is required for installing the CRONUS demonstration database.
- **SQL Server service:** Running so that the Business Central installer can connect to the database engine.
- **TCP/IP:** Enabled in SQL Server Configuration Manager under *SQL Server Network Configuration → Protocols for MSSQLSERVER*.
- **Administrator privileges:** Required to run the installer and configure Windows components.
<!-- SQLServerManager17.msc -->
## Installation Steps

### Step 1: Download the Installation Kit

Visit the Microsoft update page for [Update 27.12 for Microsoft Dynamics 365 Business Central, 2025 release wave 2](https://support.microsoft.com/en-us/servicing/dynamics/business-central/update/2026/10/update-27-12-for-microsoft-dynamics-365-business-central-2025-release-wave-2).

Scroll to the list of countries and select **All other countries/regions**.

Alternatively, download the worldwide (`W1`) installation kit directly:

[Download Business Central Installation Kit (W1)](https://download.microsoft.com/download/c6a26592-375f-4768-89ca-f37ed4ab9342/Dynamics.365.BC.55425.W1.DVD.zip)

### Step 2: Extract the Files

1. Extract the downloaded ZIP file to a folder on your computer.
2. Locate `setup.exe` in the extracted files.
3. Right-click `setup.exe` and select **Run as administrator**.

### Step 3: Select the Installation Options

Follow the installation wizard:

1. On the first screen, select **Advanced installation options**, then click **Next**.

![Screen 1](/installation-screen-1.png)

2. On the next screen, select **Choose an installation option**, then click **Next**.

![Screen 2](/installation-screen-2.png)

3. Select **Developer**, then click **Next**.

![Screen 3](/installation-screen-3.png)

4. Finally, click **Apply** to begin installation.

![Screen 4](/installation-screen-4.png)

### Step 4: Verify That the Business Central Server Is Running

The Business Central Server service runs the application’s core server components. Before accessing the web client, verify that this service is running.

1. Press **`Win + R`** to open the Run dialog.
2. Enter `services.msc` and press **Enter**.
3. Locate **Microsoft Dynamics 365 Business Central Server [BC270]** in the list of services.
4. Check the **Status** column. If the service is not running, right-click it and select **Start**.

### Step 5: Open the Business Central Web Client

The Business Central web client is hosted in Internet Information Services (IIS), which allows you to access Business Central through a web browser.

1. Open Windows Search and search for **Internet Information Services (IIS) Manager**.
2. Launch IIS Manager.
3. In the **Connections** pane on the left, expand your computer name, then expand **Sites**.
4. Locate **Microsoft Dynamics 365 Business Central Web Client** and expand it.
5. Find the **BC270** application, right-click it, and select **Manage Application → Browse**.
6. Your default web browser should open the Business Central web client.


## Additional Resources

- [Microsoft Business Central update and download information](https://support.microsoft.com/en-us/servicing/dynamics/business-central/update/2026/10/update-27-12-for-microsoft-dynamics-365-business-central-2025-release-wave-2)
- [Business Central developer documentation](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-dev-overview)
- [Microsoft documentation: Enable or disable a SQL Server network protocol](https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/enable-or-disable-a-server-network-protocol)