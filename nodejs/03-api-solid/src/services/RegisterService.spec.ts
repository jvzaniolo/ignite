import { compare } from "bcryptjs";
import { expect, suite, test } from "vitest";
import { InMemoryUserRepository } from "~/repositories/memory/InMemoryRepository";
import { RegisterService } from "./RegisterService";
import { UserAlreadyExistsError } from "./_errors";

suite("Register Service", () => {
  test("it should register a user", async () => {
    const registerService = new RegisterService(new InMemoryUserRepository());

    const { user } = await registerService.execute({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test("it should hash the user password", async () => {
    const registerService = new RegisterService(new InMemoryUserRepository());

    const { user } = await registerService.execute({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password",
    });

    const comparePassword = await compare("password", user.passwordHash);

    expect(comparePassword).toBe(true);
  });

  test("it should not create a user with the same email", async () => {
    const registerService = new RegisterService(new InMemoryUserRepository());
    const email = "john.doe@example.com";

    await registerService.execute({
      name: "John Doe",
      email,
      password: "password",
    });

    await expect(
      registerService.execute({
        name: "John Doe",
        email,
        password: "password",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
