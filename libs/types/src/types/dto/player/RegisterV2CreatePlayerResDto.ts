import { ValueOf } from "../../valueOf";
import { RegisterStageEnum } from "../../auth";

export enum StepStatus {
  Valid = "valid",
  UsernameExisted = "username-existed",
  EmailExisted = "email-existed",
  EmailInvalid = "email-invalid",
}

export interface RegisterV2CreatePlayerResDto {
  IsSuccess: boolean;
  code: number;
  data: {
    isCompleted: boolean;
    nextStepType: ValueOf<typeof RegisterStageEnum>;
    stepResponse: {
      uid: string;
      isnew: boolean;
      stepstatus: StepStatus;
    };
  };
  info: string | null;
}
