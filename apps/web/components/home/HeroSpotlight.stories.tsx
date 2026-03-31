import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HeroSpotlight } from "./HeroSpotlight";
import { homepageData } from "./homepage.data";

const meta: Meta<typeof HeroSpotlight> = {
  title: "Home/HeroSpotlight",
  component: HeroSpotlight,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof HeroSpotlight>;

export const Default: Story = {
  args: {
    hero: homepageData.hero,
  },
};

export const Loading: Story = {
  args: {
    hero: { status: "loading", slides: [] },
  },
};
