import React from "react";
import { useJoinLobbyGamePage } from "@tgs-web-nx/core/hooks";
import MaintenancePage from "@/pages/MaintenancePage";
import Loading from "@/components/UI/Loading";

const JoinLobbyGamePage = () => {
  const { isMaintenance, isLoading } = useJoinLobbyGamePage();

  if (isMaintenance) {
    return <MaintenancePage isGameMaintenance={true} />;
  }

  return <Loading show={isLoading} noShrink={true} opacity={1} />;
};

export default JoinLobbyGamePage;
