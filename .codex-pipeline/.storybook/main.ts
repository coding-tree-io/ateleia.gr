import type { StorybookConfig } from "@storybook/html-vite";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(js|ts)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-onboarding"],
  framework: {
    name: "@storybook/html-vite",
    options: {}
  },
  docs: {
    autodocs: "tag"
  }
};

export default config;
