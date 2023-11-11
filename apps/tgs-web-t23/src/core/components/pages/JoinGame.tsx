import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameService } from "@tgs-web-nx/core";
import Loading from "@/components/UI/Loading";
import MaintenancePage from "@/pages/MaintenancePage";

const JoinGame = () => {
  const { gameId, gpCode } = useParams<{ gameId: string; gpCode: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isMaintenance, setIsMaintenance] = useState(false);

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
    return <MaintenancePage isGameMaintenance={true} />;
  }

  return <Loading show={isLoading} noShrink={true} opacity={1} />;
};

export default JoinGame;
