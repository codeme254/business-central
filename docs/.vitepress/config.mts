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
          },
          {
            text: "Tables, Fields and Business Data",
            collapsed: true,
            base: "/tables-fields-and-business-data/",
            items: [
              { text: "Introduction", link: "/" },
              { text: "Creating a Table", link: "/creating-a-table.md" },
              { text: "An Overview of Pages in AL", link: "/pages-overview.md" },
              { text: "Table Triggers", link: "/table-triggers.md" },
              { text: "Table Extensions", link: "/table-extensions.md" },
              { text: "Field Groups", link: "/field-groups.md" },
              { text: "Relationship Between Tables", link: "/relationship-between-tables.md" },
              { text: "Enums and Option Like Fields", link: "/enums-and-option-like-fields.md" },
              { text: "DataClassification", link: "/dataclassification.md" },
            ]
          },
          {
            text: "Pages and User Interfaces",
            base: "/pages-and-user-interfaces/",
            collapsed: true,
            items: [
              { text: "Page Objects", link: "/page-objects.md" },
              { text: "Page Layout and Controls", link: "/page-layout-and-controls.md" },
              { text: "Fields and Data Bindings", link: "/fields-and-data-bindings.md" },
              { text: "Repeating Sections", link: "/repeating-sections.md" },
              { text: "Actions and Action Groups", link: "/actions-and-action-groups.md" },
              { text: "Page Triggers", link: "/page-triggers.md" },
              { text: "Page Variables", link: "/page-variables.md" },
              { text: "Source Table and Source Table View", link: "/sourcetable-and-sourcetableview.md" },
              { text: "Page Extensions", link: "/page-extensions.md" },
              // { text: "Page Types", link: "/page-types.md" },
            ]
          },
          {
            text: "Records, Data Access, Filtering and Validation",
            base: "/records-data-access-filtering-and-validation/",
            collapsed: true,
            items: [
              { text: "The Record Data Type", link: "/record-data-type.md" },
              { text: "Reading Data", link: "/reading-data.md" },
              { text: "Filtering Data", link: "/filtering-data.md" },
              { text: "Modifying Data", link: "/modifying-data.md" },
            ]
          },
          {
            text: "Codeunits",
            base: "/codeunits/",
            collapsed: true,
            items: [
              { text: "What are codeunits", link: "/" },
              { text: "Creating codeunits", link: "/creating-codeunits.md" },
            ]
          },
        ]
      }
    ],
  }
})
