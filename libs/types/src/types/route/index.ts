export enum RouteCategoryEnum {
  HOME,
  REFER,
  PROMOTION,
  MESSAGE_CENTER,
  MINE,
}

export interface Route {
  path: string;
  component: any;
  category: RouteCategoryEnum;
  layout?: ({ children }: any) => JSX.Element;
  isAnonymousAllowed?: boolean;
}
