import { useState } from "react";
import { GameItem } from "@tgs-web-nx/types";
import { GameService } from "@tgs-web-nx/core";

interface GameListState {
  isLoading: boolean;
  gameList: GameItem[];
  error: Error | null;
}

export function useGameList() {
  const [gameListState, setGameListState] = useState<GameListState>({
    isLoading: false,
    gameList: [],
    error: null,
  });

  const getGameList = async (gpCode: string, gameType: number) => {
    try {
      setGameListState({
        isLoading: true,
        gameList: [],
        error: null,
      });

      const response = await GameService.GetGameList(gpCode, gameType);
      setGameListState({
        isLoading: false,
        gameList: response.data,
        error: null,
      });
    } catch (error: any) {
      console.error(error);
      setGameListState({
        isLoading: false,
        gameList: [],
        error: error,
      });
    }
  };

  return {
    getGameList,
    isGameFetching: gameListState.isLoading,
    gameList: gameListState.gameList,
    error: gameListState.error,
  };
}
