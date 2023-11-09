class DataDto {
  content = "";
  localization = "";
  name = "";
  period: {
    from: string;
    to: string;
  } = {
    from: "",
    to: "",
  };
  rouletteitems: {
    title: string;
  }[] = [];
  subsubject = "";
  terms = "";
  viplevels: number[] = [];
}

export class GetDepositAccumulateRouletteResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
