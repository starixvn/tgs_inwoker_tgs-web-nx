import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GameService } from "@tgs-web-nx/core";

export function useJoinGamePage() {
  const { gameId, gpCode } = useParams<{ gameId: string; gpCode: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isMaintenance, setIsMaintenance] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const joinGame = async () => {
      const joinGameRes = await GameService.JoinGame(parseInt(gameId), gpCode);

      if (joinGameRes.IsSuccess) {
        window.location.href = joinGameRes.data.url;
      } else {
        handleJoinGameMaintenance();
      }
    };

    joinGame();
  }, [gpCode, gameId]);

  const handleJoinGameMaintenance = () => {
    setIsMaintenance(true);
    setIsLoading(false);
  };

  if (isMaintenance) {
    history.push("/maintenance?isGameMaintenance=true");
  }

  return {
    isLoading,
    isMaintenance,
  };
}
