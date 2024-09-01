import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmDeleteDialog } from "./confirm-delete-dialog";

describe("ConfirmDeleteDialog", () => {
  it("should render the dialog with correct content", () => {
    render(<ConfirmDeleteDialog onDelete={() => {}} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText("Are you absolutely sure?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "This action cannot be undone. This will permanently delete this blog post."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
  });

  it("should call onDelete when 'Continue' button is clicked", () => {
    const onDelete = jest.fn();
    render(<ConfirmDeleteDialog onDelete={onDelete} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    fireEvent.click(screen.getByText("Continue"));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
