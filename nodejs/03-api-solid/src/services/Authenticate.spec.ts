import { hash } from "bcryptjs";
import { expect, suite, test } from "vitest";
import { InMemoryUserRepository } from "~/repositories/memory/InMemoryRepository";
import { AuthenticateService } from "./Authenticate";
import { InvalidCredentialsError } from "./_errors";

suite("AuthenticateService", () => {
  test("it should authenticate a user", async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new AuthenticateService(userRepository);

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
    const userRepository = new InMemoryUserRepository();
    const sut = new AuthenticateService(userRepository);

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
    const userRepository = new InMemoryUserRepository();
    const sut = new AuthenticateService(userRepository);

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
