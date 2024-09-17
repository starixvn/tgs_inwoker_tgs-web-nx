import { useGetNonLobbyCategoryList } from "@tgs-web-nx/core/features";
import { useEffect, useRef } from "react";

import NonLobbyWrapper from "./NonLobbyWrapper";

const NonLobbyCategory = () => {
  const { gameList, isLoading } = useGetNonLobbyCategoryList();

  return <NonLobbyWrapper gameList={gameList} isLoading={isLoading} />;
};

export default NonLobbyCategory;
