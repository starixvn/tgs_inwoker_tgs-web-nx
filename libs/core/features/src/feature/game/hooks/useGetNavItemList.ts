import { useMemo, } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { NavCardKey } from "@tgs-web-nx/types";
import { useHistory } from "react-router";
import { useHomeGameContext } from "../useHomeGameContext";
import { useGameTypeList } from "./useGameTypeList";

export type NavItem = {
  key: NavCardKey | string;
  label: string | any;
  iconUrl: string;
  iconActiveUrl?: string;
  iconSecondaryUrl?: string;
  isHide?: boolean;
  router?: string;
  routePath?: string;
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

export const useGetNavGameTypeItemList = () => {
  const gameTypeList = useGameTypeList();
  const { handleChangeGameType } = useHomeGameContext();
  const history = useHistory();

  const sideNavGameTypeItemList: (NavItem & { gameType: GameTypeEnum })[] | null = useMemo(() => {
    const navItemList: (NavItem & { gameType: GameTypeEnum })[] = [];

    for (const gameTypeItem of gameTypeList) {
      navItemList.push({
        key: gameTypeItem.key,
        label: gameTypeItem.text as string,
        iconUrl: gameTypeItem.iconUrl,
        iconActiveUrl: gameTypeItem.iconActiveUrl,
        navType: "action",
        gameType: gameTypeItem.gameType,
        router: gameTypeItem.key as string,
        callback: () => {
          handleChangeGameType(gameTypeItem.gameType);
          history.push(gameTypeItem.gameType === GameTypeEnum.SPORTS ? `/${gameTypeItem.key}` : `/casino/${gameTypeItem.key}`);
        },
      });
    }

    return navItemList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameTypeList]);

  return {
    sideNavGameTypeItemList,
  };
}
