export interface NewRegisterResDto {
  IsSuccess: boolean;
  code: number;
  data: {
    isCompleted: boolean;
    nextStepType: string;
    stepResponse: {
      uid: string;
      isnew: boolean;
    };
  };
  info: string | null;
}
