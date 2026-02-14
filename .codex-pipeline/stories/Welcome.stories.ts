import type { Meta, StoryObj } from "@storybook/html";

type WelcomeArgs = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
};

const meta: Meta<WelcomeArgs> = {
  title: "Design/Welcome Card",
  tags: ["autodocs"],
  args: {
    eyebrow: "Codex Pipeline",
    title: "Reusable website design QA sidecar",
    body: "This Storybook runs from a project-local .codex-pipeline folder so any stack can share the same workflow.",
    cta: "Run accessibility checks"
  },
  render: ({ eyebrow, title, body, cta }) => `
    <main class="canvas">
      <article class="card" aria-label="Design pipeline summary">
        <p class="eyebrow">${eyebrow}</p>
        <h1>${title}</h1>
        <p class="body">${body}</p>
        <button type="button" class="cta">${cta}</button>
      </article>
    </main>
  `
};

export default meta;

type Story = StoryObj<WelcomeArgs>;

export const Default: Story = {};
