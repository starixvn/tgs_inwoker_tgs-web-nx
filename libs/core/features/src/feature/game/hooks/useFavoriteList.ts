import { useCallback, useEffect, useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useAccountStore } from "@tgs-web-nx/core";
import { useGameStore } from "@tgs-web-nx/core";

export function useFavoriteList(activeGameType: GameTypeEnum) {
  const { account } = useAccountStore();
  const { getFavoriteGame } = useGameStore();
  const [favoriteList, setFavoriteList] = useState<number[]>([]);

  const fetchFavoriteList = useCallback(async () => {
    const getFavoriteResDto = await getFavoriteGame(activeGameType);
    setFavoriteList(getFavoriteResDto?.data || []);
  }, [activeGameType]);

  useEffect(() => {
    if (account.token && activeGameType) {
      fetchFavoriteList();
    }
  }, [account.token, activeGameType]);

  return {
    favoriteList,
    fetchFavoriteList,
  };
}
