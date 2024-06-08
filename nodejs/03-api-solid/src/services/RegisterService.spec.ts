import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "~/repositories/memory/InMemoryRepository";
import { RegisterService } from "./RegisterService";
import { UserAlreadyExistsError } from "./_errors";

describe("Register Service", () => {
  it("should register a user", async () => {
    // Arrange
    const registerService = new RegisterService(new InMemoryUserRepository());

    // Act
    const { user } = await registerService.execute({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password",
    });

    // Assert
    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash the user password", async () => {
    // Arrange
    const registerService = new RegisterService(new InMemoryUserRepository());

    // Act
    const { user } = await registerService.execute({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password",
    });

    const comparePassword = await compare("password", user.passwordHash);

    // Assert
    expect(comparePassword).toBe(true);
  });

  it("should not create a user with the same email", async () => {
    // Arrange
    const registerService = new RegisterService(new InMemoryUserRepository());
    const email = "john.doe@example.com";

    // Act
    await registerService.execute({
      name: "John Doe",
      email,
      password: "password",
    });

    // Assert
    await expect(
      registerService.execute({
        name: "John Doe",
        email,
        password: "password",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
