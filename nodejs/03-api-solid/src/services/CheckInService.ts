import type { CheckIn } from "@prisma/client";
import type { ICheckInRepository } from "~/repositories/CheckInRepository";

interface CheckInServiceRequest {
  userId: string;
  gymId: string;
}

interface CheckInServiceResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(private readonly checkInRepository: ICheckInRepository) {}

  async execute(data: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const checkIn = await this.checkInRepository.create(data);

    return { checkIn };
  }
}
