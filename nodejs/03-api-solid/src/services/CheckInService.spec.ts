import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { InMemoryCheckInRepository } from "~/repositories/memory/InMemoryCheckInRepository";
import { InMemoryGymRepository } from "~/repositories/memory/InMemoryGymRepository";
import { CheckInService } from "./CheckInService";

let gymRepository: InMemoryGymRepository;
let checkInRepository: InMemoryCheckInRepository;
let sut: CheckInService;

describe("CheckInService", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository();
    gymRepository = new InMemoryGymRepository();
    sut = new CheckInService(checkInRepository, gymRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("it should check in a user", async () => {
    const { checkIn } = await sut.execute({
      userId: "usr_1",
      gymId: "gym_1",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  test("it should not check in a user twice with the same gym on the same day", async () => {
    vi.setSystemTime(new Date("2024-06-08"));

    await sut.execute({
      userId: "usr_1",
      gymId: "gym_1",
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(
      sut.execute({
        userId: "usr_1",
        gymId: "gym_1",
        userLatitude: 0,
        userLongitude: 0,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  test("it should check in a user on a different day", async () => {
    vi.setSystemTime(new Date("2024-06-08"));

    await sut.execute({
      userId: "usr_1",
      gymId: "gym_1",
      userLatitude: 0,
      userLongitude: 0,
    });

    vi.setSystemTime(new Date("2024-06-09"));

    const { checkIn } = await sut.execute({
      userId: "usr_1",
      gymId: "gym_1",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
