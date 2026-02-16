import type { Meta, StoryObj } from '@storybook/react-vite';

import { HomePageScaffold } from '@/components/home/HomePageScaffold';

const meta = {
  title: 'Pages/HomePageScaffold',
  component: HomePageScaffold,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HomePageScaffold>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
