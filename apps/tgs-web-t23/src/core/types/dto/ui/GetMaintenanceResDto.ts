class DataDto {
  beginTime = "";
  endTime = "";
  content = "";
}

export class GerMaintenanceResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
