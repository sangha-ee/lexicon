import type { Meta, StoryObj } from "@storybook/react";
import { PostsTableSkeleton } from "./skeleton";

const meta = {
  title: "PostsTable/Skeleton",
  component: PostsTableSkeleton,
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
} satisfies Meta<typeof PostsTableSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
