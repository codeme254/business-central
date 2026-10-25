# Installing Business Central Locally

Before we start building extensions and writing AL code, we need a working **Microsoft Dynamics 365 Business Central development environment**.

A development environment allows us to connect to Business Central, write AL code, compile extensions, test our changes, and debug our applications.

There are several ways to set up this environment. The two main approaches we'll consider are running Business Central locally and using an online sandbox.

## 1. Option A: Install Business Central Locally

Running Business Central locally allows us to host an instance of Business Central on our own computer. This gives us a dedicated environment for development and experimentation without modifying a production system.

There are two main approaches to consider.

### A. Using Docker Containers

Docker allows us to run Business Central inside a container rather than installing the entire application directly on Windows.

A **container** is an isolated environment that packages an application and the components it needs to run.

Microsoft provides Business Central artifacts that can be used to create container-based development environments. The `BCContainerHelper` PowerShell module simplifies the process of creating and managing these containers.

**Advantages:**
- Makes it easier to create and recreate development environments.
- Allows us to work with different Business Central versions.
- Keeps the development environment separate from the host operating system.
- Supports testing extensions in a controlled environment.

**Important considerations:**
- Business Central containers require Windows containers, not the default Linux containers used by Docker.
- Docker must be configured correctly, and the Windows edition and container host must meet the relevant requirements.
- Containers consume system resources, so available RAM and disk space matter.

**Recommended resource:** [Running a Container-Based Development Environment](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-running-container-development)

### B. Using the Business Central Installation Media

Another option is to install an on-premises version of Business Central using Microsoft's installation media.

The installation media contains the components required to install and configure an on-premises Business Central environment. Depending on the selected components, this can include the Business Central Server, web client, and database-related components.

This approach is useful when you want to understand the architecture of an on-premises deployment or need access to components that aren't available in an online sandbox.

**Advantages:**
- Provides an on-premises Business Central environment.
- Gives you more control over the installed server components and configuration.
- Can be useful when learning about Business Central Server and SQL Server integration.

**Important considerations:**
- Installation and configuration can involve more manual work.
- You must ensure that the Business Central version is compatible with your operating system and other dependencies.
- Some configurations require Microsoft SQL Server and additional setup.

For someone primarily learning AL development, a container-based environment is often a convenient starting point if the machine supports it.

## 2. Option B: Use Business Central Online

If running Business Central locally isn't practical, you can use a **Business Central online sandbox**.

A sandbox is an isolated environment used for development, testing, and experimentation without making changes directly to a production environment.

Microsoft hosts the online environment, so you don't need to install and maintain the Business Central Server on your computer.

You can use Visual Studio Code and the AL Language extension to connect to the sandbox, download the required symbols, develop extensions, and publish your changes.

**Advantages:**
- No need to host Business Central locally.
- Microsoft manages the underlying infrastructure.
- Provides a convenient environment for learning AL development.
- Allows you to develop and test extensions using Visual Studio Code.

**Important considerations:**
- Access depends on having an eligible Business Central environment and the necessary permissions.
- Some capabilities available in locally hosted containers aren't available in online sandboxes.
- Online environments are managed by Microsoft, so you have less control over the underlying server and database.
- Sandbox environments can be updated or relocated, which can affect extensions published directly to them.

**Recommended resource:** [Sandbox Environments for Business Central Development](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-sandbox-overview)

### Do I need a business email address?

You may need an eligible work or school account, an appropriate Microsoft Entra ID tenant, and a Business Central subscription or trial to access an online environment.

A custom-domain business email address is not, by itself, a universal requirement for every development setup. However, account eligibility and trial availability can vary.

Before purchasing a domain or email-hosting service, check Microsoft's current requirements and available trial options.

<!-- ## 4. What Comes Next?

Once Business Central is running, we need to configure our development tools.

The basic setup involves:

1. **Install Visual Studio Code.** This is the editor we'll use to write and manage our AL code.
2. **Install the AL Language extension.** This extension provides AL language support, code completion, compilation, and integration with Business Central.
3. **Create an AL project.** Use the `AL: Go!` command in Visual Studio Code to generate a new project.
4. **Configure the connection.** Set up the appropriate server and environment details in the project's `launch.json` file.
5. **Download symbols.** Symbols provide metadata about existing Business Central objects, allowing our extension to reference standard tables, pages, codeunits, and other application objects.
6. **Publish and test the extension.** Compile the project and publish it to our development environment.

We'll cover these steps in more detail as we progress through the practical exercises. -->

## Further Reading and Official Documentation

Use the following resources to deepen your understanding and troubleshoot setup issues.

| Resource | What You'll Learn |
|---|---|
| [Business Central Developer Documentation](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/) | The official technical documentation for Business Central development. |
| [Get Started with AL](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-get-started) | How to prepare your development environment and begin writing AL code. |
| [Container-Based Development Environment](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-running-container-development) | How to configure Docker and create a local Business Central container. |
| [Sandbox Environments](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-sandbox-overview) | The differences between online and container-based sandboxes. |
| [Developing Extensions in AL](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-dev-overview) | An introduction to extension development and Business Central application objects. |
| [AL Language Extension Configuration](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-al-extension-configuration) | How to configure the AL development tools in Visual Studio Code. |
| [Business Central Development FAQ](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-dev-faq) | Answers to common questions and troubleshooting guidance. |
| [GitHub Codespaces for AL Development](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-code-spaces-al) | How to use a cloud-hosted development environment for AL development. |
