export type CustomMessaging = {
  name: string;
  isVisualized: boolean;
};

export type CustomMessagingDto = {
  IsSuccess: boolean;
  code: number;
  data: CustomMessaging[];
  info: string | null;
};
