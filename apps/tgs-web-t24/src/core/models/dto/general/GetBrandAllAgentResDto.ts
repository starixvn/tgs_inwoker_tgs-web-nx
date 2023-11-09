export class BrandAllAgent {
  activenumber = 0;
  allagentgametype = 0;
  rank = 0;
  rebatepercentage = 0;
  turnover = 0;
}

export class GetBrandAllAgentResDto {
  IsSuccess = true;
  code = 0;
  data: BrandAllAgent[] = [];
  info: string | null = null;
}
