import { cn, formatDateToLocal } from "./utils";

describe("cn", () => {
  it("should merge class names correctly", () => {
    const result = cn("foo", "bar", { baz: true }, ["qux", "quux"]);
    expect(result).toBe("foo bar baz qux quux");
  });

  it("should handle empty inputs", () => {
    const result = cn();
    expect(result).toBe("");
  });
});

describe("formatDateToLocal", () => {
  it("should format date to local string", () => {
    const date = new Date("2022-01-01");
    const result = formatDateToLocal(date);
    expect(result).toBe("Jan 1, 2022");
  });

  it("should format date to local string with custom locale", () => {
    const date = new Date("2022-01-01");
    const result = formatDateToLocal(date, "et-EE");
    expect(result).toBe("1. jaan 2022");
  });
});
