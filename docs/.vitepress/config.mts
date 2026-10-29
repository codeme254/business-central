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
          },
          // {
          //   text: "Setting Up Business Central Online for AL Development",
          //   base: "/business-central-online/",
          //   collapsed: true,
          //   items: [
          //     { text: "Getting Access to a BC Online Environment", link: "/getting-access-to-a-bc-online-environment.md" }
          //   ]
          // },
          {
            text: "Your First AL Programs",
            base: "/your-first-al-programs/",
            collapsed: true,
            items: [
              { text: "What is AL", link: "/what-is-al.md" },
              { text: "AL Syntax and Statement Structure", link: "/al-syntax-and-statement-structure.md" },
              { text: "Namespaces and Identifiers", link: "/namespaces-and-identifiers.md" },
              { text: "AL Objects and Object IDs", link: "/al-objects-and-object-ids.md" },
              { text: "Comments and Naming Conventions", link: "/comments-and-naming-conventions.md" },
              { text: "Message(), Error() and Confirm()", link: "/message-error-and-confirm.md" },
              { text: "Triggers and When They Execute", link: "/triggers-and-when-they-execute.md" },
              { text: "Building, Publishing and Running an Extension", link: "/building-publishing-and-running-an-extension.md" },
            ]
          },
          {
            text: "Variables, Data Types, Operators and Control Flow",
            base: "/variables-data-types-operators-and-control-flow/",
            collapsed: true,
            items: [
              { text: "Variables and Data Types", link: "/variables-and-data-types.md" },
              { text: "Operators and Expressions", link: "/operators-and-expressions.md" },
              { text: "Control Flow", link: "/control-flow.md" },
              { text: "Collections", link: "/collections.md" },
              { text: "Practical Exercises", link: "/practical-exercises.md" },
            ]
          },
          {
            text: "Procedures",
            collapsed: true,
            base: "/procedures/",
            items: [
              { text: "Procedures", link: "/" },
              { text: "Practical Exercises", link: "/practical-exercises.md" },
            ]
          }
        ]
      }
    ],
  }
})
