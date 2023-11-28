export interface Route {
  path: string;
  component: any;
  layout?: ({ children }: any) => JSX.Element;
  isAnonymousAllowed?: boolean;
}
