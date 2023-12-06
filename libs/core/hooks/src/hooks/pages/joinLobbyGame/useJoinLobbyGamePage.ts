import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GameService } from "@tgs-web-nx/core";

export function useJoinLobbyGamePage() {
  const { gameType, gpCode } = useParams<{ gameType: string; gpCode: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isMaintenance, setIsMaintenance] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const joinLobbyGame = async () => {
      const joinLobbyGameRes = await GameService.JoinLobbyGame(gameType, gpCode);

      if (joinLobbyGameRes.IsSuccess) {
        window.location.href = joinLobbyGameRes.data.url;
      } else {
        handleJoinGameMaintenance();
      }
    };

    joinLobbyGame();
  }, [gameType, gpCode]);

  const handleJoinGameMaintenance = () => {
    setIsMaintenance(true);
    setIsLoading(false);
  };

  if (isMaintenance) {
    history.push("/maintenance?isGameMaintenance=true");
  }

  return {
    isLoading,
  };
}
