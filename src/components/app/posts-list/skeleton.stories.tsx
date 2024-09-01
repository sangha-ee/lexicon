import type { Meta, StoryObj } from "@storybook/react";
import { PostsListSkeleton } from ".";

const meta = {
  title: "PostsList/Skeleton",
  component: PostsListSkeleton,
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
} satisfies Meta<typeof PostsListSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
