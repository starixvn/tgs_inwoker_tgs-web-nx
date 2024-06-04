export type SocialMediaInfo = {
  id: string;
  name: string;
  type: SocialMediaEnum;
  url: string;
};

export enum SocialMediaEnum {
  Facebook = 1,
  X = 2,
  Instagram = 3,
  Threads = 4,
  Tiktok = 5,
  Telegram = 6,
  WhatsApp = 7,
}

export type SocialMediaResDto = {
  IsSuccess: boolean;
  code: number;
  data: SocialMediaInfo[];
  info: string | null;
};
