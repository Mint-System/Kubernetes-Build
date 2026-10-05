import { defineConfig } from "vitepress";
import { vitepressMermaidPreview } from "vitepress-mermaid-preview";

export default defineConfig({
  srcExclude: ["prompts/**"],
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
      {
        text: "Charts",
        items: [
          { text: "cluster-issuer", link: "/cluster-issuer/README.html" },
          { text: "deployment-updater", link: "/deployment-updater/README.html" },
          { text: "forgejo-runner", link: "/forgejo-runner/README.html" },
          { text: "nextcloud", link: "/nextcloud/README.html" },
          { text: "odoo", link: "/odoo/README.html" },
          { text: "postgres", link: "/postgres/README.html" },
          { text: "prometheus-agent", link: "/prometheus-agent/README.html" },
          { text: "taskfile-build", link: "/taskfile-build/README.html" },
          { text: "vshn-postgres", link: "/vshn-postgres/README.html" },
        ],
      },
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
