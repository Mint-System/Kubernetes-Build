import { defineConfig } from "vitepress";
import { vitepressMermaidPreview } from "vitepress-mermaid-preview";

export default defineConfig({
  title: "Kubernetes Build",
  description: "The Mint System collection of Helm Charts.",
  head: [["link", { rel: "icon", type: "image/png", href: "/icon.png" }]],
  themeConfig: {
    logo: "/icon.png",
    search: {
      provider: "local",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Odoo Build", link: "https://odoo.build/" },
      { text: "Mint System", link: "https://www.mint-system.ch/" },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Mint-System/Kubernetes-Build",
      },
    ],
  },
  markdown: {
    config: (md) => {
      vitepressMermaidPreview(md);
    },
  },
});
