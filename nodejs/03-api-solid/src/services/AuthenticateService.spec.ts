import { hash } from "bcryptjs";
import { beforeEach, expect, suite, test } from "vitest";
import { InMemoryUserRepository } from "~/repositories/memory/InMemoryUserRepository";
import { AuthenticateService } from "./AuthenticateService";
import { InvalidCredentialsError } from "./_errors";

let userRepository: InMemoryUserRepository;
let sut: AuthenticateService;

suite("AuthenticateService", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new AuthenticateService(userRepository);
  });

  test("it should authenticate a user", async () => {
    await userRepository.create({
      name: "Test",
      email: "test@test.com",
      passwordHash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "test@test.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test("should throw an error if the email is invalid", async () => {
    await userRepository.create({
      name: "Test",
      email: "test@test.com",
      passwordHash: await hash("123456", 6),
    });

    await expect(
      sut.execute({ email: "another-test@test.com", password: "123456" })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  test("should throw an error if the password is invalid", async () => {
    await userRepository.create({
      name: "Test",
      email: "test@test.com",
      passwordHash: await hash("123456", 6),
    });

    await expect(
      sut.execute({ email: "test@test.com", password: "password" })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
