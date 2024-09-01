import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { EditPost } from "./edit-post";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));
jest.mock("./use-edit-post-overlay");
jest.mock("@/lib/data");
jest.mock("@/lib/actions");
jest.mock("@vercel/postgres-kysely", () => ({
  createKysely: jest.fn(),
}));

const useSearchParamsMock = require("next/navigation").useSearchParams;
const useEditPostOverlayMock =
  require("./use-edit-post-overlay").useEditPostOverlay;
const fetchPostMock = require("@/lib/data").fetchPost;
const createOrUpdatePostMock = require("@/lib/actions").createOrUpdatePost;

describe("EditPost", () => {
  beforeEach(() => {
    useEditPostOverlayMock.mockReturnValue({
      isOpen: true,
      openOverlay: jest.fn(),
      closeOverlay: jest.fn(),
    });
    useSearchParamsMock.mockReturnValue({
      get: jest.fn((key) => {
        if (key === "id") return "1";
        return null;
      }),
    });
    fetchPostMock.mockResolvedValue({
      title: "Sample Title",
      description: "Sample Description",
    });
    createOrUpdatePostMock.mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the EditPost dialog", async () => {
    const { getByText } = render(<EditPost />);

    await waitFor(() => expect(fetchPostMock).toHaveBeenCalledWith(1));

    expect(getByText("Title")).toBeInTheDocument();
    expect(getByText("Sample Description")).toBeInTheDocument();
  });

  it("should display error messages when form submission fails", async () => {
    createOrUpdatePostMock.mockResolvedValueOnce({
      errors: {
        title: "Title error",
        description: "Description error",
      },
    });

    const { getByLabelText, getByText } = render(<EditPost />);

    await waitFor(() => expect(fetchPostMock).toHaveBeenCalledWith(1));

    fireEvent.change(getByLabelText(/title/i), {
      target: { value: "New Title" },
    });
    fireEvent.change(getByLabelText(/description/i), {
      target: { value: "New Description" },
    });
    fireEvent.click(getByText(/submit/i));

    await waitFor(() => {
      expect(getByText(/title error/i)).toBeInTheDocument();
      expect(getByText(/description error/i)).toBeInTheDocument();
    });
  });

  it("should reset error messages on input change", async () => {
    createOrUpdatePostMock.mockResolvedValueOnce({
      errors: {
        title: "Title error",
        description: "Description error",
      },
    });

    const { getByLabelText, getByText, queryByText } = render(<EditPost />);

    await waitFor(() => expect(fetchPostMock).toHaveBeenCalledWith(1));

    fireEvent.change(getByLabelText(/title/i), {
      target: { value: "New Title" },
    });
    fireEvent.change(getByLabelText(/description/i), {
      target: { value: "New Description" },
    });
    fireEvent.click(getByText(/submit/i));

    await waitFor(() => {
      expect(getByText(/title error/i)).toBeInTheDocument();
      expect(getByText(/description error/i)).toBeInTheDocument();
    });

    fireEvent.change(getByLabelText(/title/i), {
      target: { value: "Another Title" },
    });

    expect(queryByText(/title error/i)).not.toBeInTheDocument();
    expect(queryByText(/description error/i)).not.toBeInTheDocument();
  });

  it("should close the overlay after successful form submission", async () => {
    const closeOverlayMock = jest.fn();
    useEditPostOverlayMock.mockReturnValue({
      isOpen: true,
      openOverlay: jest.fn(),
      closeOverlay: closeOverlayMock,
    });

    const { getByLabelText, getByText } = render(<EditPost />);

    await waitFor(() => expect(fetchPostMock).toHaveBeenCalledWith(1));

    fireEvent.change(getByLabelText(/title/i), {
      target: { value: "New Title" },
    });
    fireEvent.change(getByLabelText(/description/i), {
      target: { value: "New Description" },
    });
    fireEvent.click(getByText(/submit/i));

    await waitFor(() => {
      expect(closeOverlayMock).toHaveBeenCalled();
    });
  });
});
