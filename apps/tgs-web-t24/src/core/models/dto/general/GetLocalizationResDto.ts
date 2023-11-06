export type LocalizationData = {
  [key in string]: string;
};

export interface GetLocalizationResDto {
  IsSuccess: boolean;
  code: number;
  data: LocalizationData;
  info: string | null;
}
