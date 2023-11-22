export enum RouteCategoryEnum {
  HOME,
  REFER,
  PROMOTION,
  INBOX,
  MINE,
}

export interface Route {
  path: string;
  component: any;
  category: RouteCategoryEnum;
  layout?: ({ children }: any) => JSX.Element;
  isAnonymousAllowed?: boolean;
}
