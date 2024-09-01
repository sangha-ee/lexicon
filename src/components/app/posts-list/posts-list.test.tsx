import { render, screen } from "@testing-library/react";
import { type BlogPost } from "@/lib/definitions";
import { PostsList } from "./posts-list";

const posts: BlogPost[] = [
  {
    id: 1,
    title: "First Post",
    description: "This is my first blog post",
    createdAt: new Date(2024, 5, 1),
  },
  {
    id: 2,
    title: "Second Post",
    description: "This is my second blog post",
    createdAt: new Date(2024, 5, 1),
  },
];

describe("PostsList", () => {
  it("should render posts list", async () => {
    render(<PostsList posts={posts} />);

    posts.forEach(({ title, description }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });
});
