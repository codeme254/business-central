import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Microsoft Dynamic 365 Business Central",
  description: "Microsoft Dynamic 365 Business Central",
  themeConfig: {
    sidebar: [
      {
        items: [
          { text: 'What is Business Central', link: '/' },
          {
            text: "Installation and Setup",
            base: "/installation-and-setup/",
            collapsed: true,
            items: [
              { text: "Installing Business Central Locally", link: "/" },
              { text: "Installing Business Central Locally on Docker Desktop", link: "/installing-business-central-on-premises-on-docker-desktop.md" },
              { text: "Troubleshooting Powershell Errors", link: "/troubleshooting-powershell-errors.md" },
              { text: "Installing Business Central From The Microsoft Installation Kit", link: "/installing-business-central-from-microsoft-installation-kit.md" },
              { text: "Installing VS Code and AL Extensions", link: "/install-vs-code-and-al-extensions.md" },
              { text: "Hello World", link: "/hello-world.md" },
            ]
          }
        ]
      }
    ],
  }
})
