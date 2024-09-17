import { useGetNonLobbyCategoryList } from "@tgs-web-nx/core/features";

import NonLobbyWrapper from "./NonLobbyWrapper";

const NonLobbyCategory = () => {
  const { gameList, isLoading, total } = useGetNonLobbyCategoryList();

  return <NonLobbyWrapper gameList={gameList} isLoading={isLoading} totalGames={total} />;
};

export default NonLobbyCategory;
