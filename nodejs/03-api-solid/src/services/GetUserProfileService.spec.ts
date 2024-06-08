import { hash } from "bcryptjs";
import { beforeEach, expect, suite, test } from "vitest";
import { InMemoryUserRepository } from "~/repositories/memory/InMemoryUserRepository";
import { GetUserProfileService } from "./GetUserProfileService";
import { UserNotFoundError } from "./_errors";

let userRepository: InMemoryUserRepository;
let sut: GetUserProfileService;

suite("GetUserProfileService", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new GetUserProfileService(userRepository);
  });

  test("it should get a user profile", async () => {
    const { id: userId } = await userRepository.create({
      name: "Test",
      email: "test@test.com",
      passwordHash: await hash("123456", 6),
    });

    const { user } = await sut.execute({ userId });

    expect(user).toEqual(
      expect.objectContaining({
        id: user.id,
        name: "Test",
        email: "test@test.com",
      })
    );
  });

  test("should throw an error if the user is not found", async () => {
    await userRepository.create({
      name: "Test",
      email: "test@test.com",
      passwordHash: await hash("123456", 6),
    });

    await expect(
      sut.execute({ userId: "non-existing-user" })
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });
});
