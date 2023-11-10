class Marquee {
  subject = "";
  content = "";
  from = 0;
  to = 0;
  localization = "";
  type = "";
}

class DataDto {
  deposits: Marquee[] = [];
  mains: Marquee[] = [];
  marquees: Marquee[] = [];
}

export class GetMarqueeResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: DataDto = new DataDto();
}
