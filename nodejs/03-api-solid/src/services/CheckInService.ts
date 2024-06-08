import type { CheckIn } from "@prisma/client";
import type { ICheckInRepository } from "~/repositories/CheckInRepository";
import type { IGymRepository } from "~/repositories/GymRepository";
import { ResourceNotFoundError } from "./_errors";

interface CheckInServiceRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInServiceResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(
    private readonly checkInRepository: ICheckInRepository,
    private readonly gymRepository: IGymRepository
  ) {}

  async execute(data: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const gym = await this.gymRepository.findById(data.gymId);

    if (!gym) {
      throw new ResourceNotFoundError("Gym not found");
    }

    // TODO: calculate distance between user and gym

    const hasCheckIn = await this.checkInRepository.findByUserIdOnDate(
      data.userId,
      new Date()
    );

    if (hasCheckIn) {
      throw new Error("You have already checked in on this day");
    }

    const checkIn = await this.checkInRepository.create(data);

    return { checkIn };
  }
}
