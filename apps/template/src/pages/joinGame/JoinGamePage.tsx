import React from "react";
import { useJoinGamePage } from "@tgs-web-nx/core/hooks";
import MaintenancePage from "@/pages/MaintenancePage";
import Loading from "@/components/UI/Loading";

const JoinGamePage = () => {
  const { isLoading, isMaintenance } = useJoinGamePage();

  if (isMaintenance) {
    return <MaintenancePage isGameMaintenance={true} />;
  }

  return <Loading show={isLoading} noShrink={true} opacity={1} />;
};

export default JoinGamePage;
