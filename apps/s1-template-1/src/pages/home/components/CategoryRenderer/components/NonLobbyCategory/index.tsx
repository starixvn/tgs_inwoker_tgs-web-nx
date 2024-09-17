import { useGetNonLobbyCategoryList } from "@tgs-web-nx/core/features";

import NonLobbyWrapper from "./NonLobbyWrapper";

const NonLobbyCategory = () => {
  const { gameList, isLoading } = useGetNonLobbyCategoryList();

  return <NonLobbyWrapper gameList={gameList} isLoading={isLoading} />;
};

export default NonLobbyCategory;
