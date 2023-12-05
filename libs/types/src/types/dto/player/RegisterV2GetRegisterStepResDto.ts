import { ValueOf } from "../../valueOf";
import { RegisterStageEnum } from "../../auth";

export interface RegisterV2GetRegisterStepResDto {
  IsSuccess: boolean;
  code: number;
  data: ValueOf<typeof RegisterStageEnum>;
  info: string | null;
}
