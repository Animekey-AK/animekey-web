import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HomeHeader } from "./HomeHeader";

const meta: Meta<typeof HomeHeader> = {
  title: "Home/HomeHeader",
  component: HomeHeader,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof HomeHeader>;

export const Default: Story = {};
