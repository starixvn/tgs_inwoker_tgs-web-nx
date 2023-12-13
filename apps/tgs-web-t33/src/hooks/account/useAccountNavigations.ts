import { useMemo } from "react";
import { NavCardKey } from "@tgs-web-nx/types";

export type NavItem = {
  key: NavCardKey | string;
  label: string | any;
  iconUrl: string;
  iconActiveUrl?: string;
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

export function useAccountNavigations() {
  const navItemList: NavItem[] = useMemo(() => {
    return [];
  }, []);

  const navItemDictionary = useMemo(() => {
    const dictionary: { [key in string]: NavItem } = {};
    navItemList.forEach((navItem) => {
      dictionary[navItem.key] = navItem;
    });

    return dictionary;
  }, []);

  return {
    navItemList,
    navItemDictionary,
  };
}
