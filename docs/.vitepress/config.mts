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
              { text: "Installing Business Central Locally", link: "/" }
            ]
          }
        ]
      }
    ],
  }
})
