import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameService } from "@tgs-web-nx/core";
import Loading from "@/components/UI/Loading";
import MaintenancePage from "@/pages/MaintenancePage";

const JoinLobbyGame = () => {
  const { gameType, gpCode } = useParams<{ gameType: string; gpCode: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isMaintenance, setIsMaintenance] = useState(false);

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
    return <MaintenancePage isGameMaintenance={true} />;
  }

  return <Loading show={isLoading} noShrink={true} opacity={1} />;
};

export default JoinLobbyGame;
