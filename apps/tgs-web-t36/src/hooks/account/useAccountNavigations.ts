import { NavCardKey } from "@tgs-web-nx/types";

export type NavItem = {
  key: NavCardKey;
  label: string | any;
  iconUrl: string;
  iconSecondaryUrl?: string;
  isHide?: boolean;
} & (
    | {
      navType: "route";
      routePath: string;
    }
    | {
      navType: "action";
      callback: () => void;
    }
  );