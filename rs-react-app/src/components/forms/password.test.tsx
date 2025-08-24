import { describe, it, expect } from "vitest";

import { schema } from "./uncontrolled-form";

describe("password validation", () => {
  it("should fail because of mismatched passwords", () => {
    const result = schema.safeParse({
      password: "Abc4343df!",
      confirmPassword: "wrongpass",
    });
    expect(result.success).toBe(false);
  });

  it("should fail if no uppercase letter", () => {
    const result = schema.safeParse({
      name: "Dima",
      age: 30,
      email: "dima@example.com",
      password: "dimaef1!",
      confirmPassword: "wrongpass",
      gender: "male",
      acceptTerms: true,
      picture: "some-url",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issues = result.error.issues;
      expect(
        issues.some((issue) => issue.message === "Password must contain at least one uppercase letter")
      ).toBe(true);
    }
  });

});
