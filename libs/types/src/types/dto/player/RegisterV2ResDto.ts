export interface RegisterV2ResDto {
  IsSuccess: boolean;
  code: number;
  data: {
    isCompleted: boolean;
    nextStepType: string;
    stepResponse: string;
  };
  info: string | null;
}
