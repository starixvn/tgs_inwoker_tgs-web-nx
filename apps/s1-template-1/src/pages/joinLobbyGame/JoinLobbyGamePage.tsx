import React from "react";
import { useJoinLobbyGamePage } from "@tgs-web-nx/core/hooks";
import Loading from "@/components/UI/Loading";

const JoinLobbyGamePage = () => {
  const { isLoading } = useJoinLobbyGamePage();

  return <Loading show={isLoading} noShrink={true} opacity={1} />;
};

export default JoinLobbyGamePage;
