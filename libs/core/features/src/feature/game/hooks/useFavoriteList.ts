import { useCallback, useEffect, useState } from "react";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useAccountStore, useGameStore } from "@tgs-web-nx/core";

export function useFavoriteList(activeGameType: GameTypeEnum) {
  const { account } = useAccountStore();
  const { getFavoriteGame } = useGameStore();
  const [favoriteList, setFavoriteList] = useState<number[]>([]);

  const fetchFavoriteList = useCallback(async () => {
    if (!account.token) return;
    const getFavoriteResDto = await getFavoriteGame(activeGameType);

    if (getFavoriteResDto?.IsSuccess) {
      setFavoriteList(getFavoriteResDto?.data || []);
    } else {
      setFavoriteList([]);
    }
  }, [activeGameType]);

  useEffect(() => {
    fetchFavoriteList();
  }, []);

  return {
    favoriteList,
    fetchFavoriteList,
  };
}
