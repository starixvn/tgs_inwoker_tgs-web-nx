import { useCallback, useEffect, useState } from "react";
import { useAccountStore } from "@/core/stores/useAccountStore";
import { useGameStore } from "@/core/stores/useGameStore";
import { GameTypeEnum } from "@/core/constants/GameTypeEnum";

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
