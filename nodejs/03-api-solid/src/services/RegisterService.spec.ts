import { compare } from "bcryptjs";
import { beforeEach, expect, suite, test } from "vitest";
import { InMemoryUserRepository } from "~/repositories/memory/InMemoryRepository";
import { RegisterService } from "./RegisterService";
import { UserAlreadyExistsError } from "./_errors";

let userRepository: InMemoryUserRepository;
// Stands for "System Under Test", represents the code being tested
let sut: RegisterService;

suite("Register Service", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new RegisterService(userRepository);
  });

  test("it should register a user", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test("it should hash the user password", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password",
    });

    const comparePassword = await compare("password", user.passwordHash);

    expect(comparePassword).toBe(true);
  });

  test("it should not create a user with the same email", async () => {
    const email = "john.doe@example.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "password",
    });

    await expect(
      sut.execute({
        name: "John Doe",
        email,
        password: "password",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
