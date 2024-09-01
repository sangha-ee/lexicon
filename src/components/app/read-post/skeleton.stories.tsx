import type { Meta, StoryObj } from "@storybook/react";
import { ReadPostSkeleton } from ".";

const meta = {
  title: "ReadPost/Skeleton",
  component: ReadPostSkeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReadPostSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
