import { ValueOf } from "../../valueOf";
import { RegisterStageEnum } from "../../auth";

export interface RegisterV2ResDto {
  IsSuccess: boolean;
  code: number;
  data: {
    isCompleted: boolean;
    nextStepType: ValueOf<typeof RegisterStageEnum>;
    stepResponse: string;
  };
  info: string | null;
}
