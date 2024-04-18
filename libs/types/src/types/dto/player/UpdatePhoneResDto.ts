import { ValueOf } from "../../valueOf";
import { RegisterStageEnum } from "../../auth";

export interface UpdatePhoneResDto {
  IsSuccess: boolean;
  code: number;
  data: {
    isCompleted: boolean;
    nextStepType: ValueOf<typeof RegisterStageEnum>;
    stepResponse: {
      uid: string;
      isnew: boolean;
    };
  };
  info: string | null;
}

