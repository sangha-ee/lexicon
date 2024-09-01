import { render, screen } from "@testing-library/react";
import { ReadPost } from "./read-post";
import { formatDateToLocal } from "@/lib/utils";

const post = {
  id: 1,
  title: "First Post",
  description: "This is my first blog post",
  createdAt: new Date(2024, 5, 1),
};

describe("ReadPost", () => {
  it("should render post details", () => {
    render(<ReadPost post={post} />);

    const formattedDate = formatDateToLocal(post.createdAt);

    expect(screen.getByText(formattedDate)).toBeInTheDocument();
    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(post.description)).toBeInTheDocument();
  });
});
