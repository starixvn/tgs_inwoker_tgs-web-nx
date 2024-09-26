import { StepStatus } from "./RegisterV2CreatePlayerResDto";
export interface SetPhoneResDto {
  IsSuccess: boolean;
  code: number;
  data: {
    stepStatus: StepStatus;
  };
  info: string | null;
}
