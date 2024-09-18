import { useGetNonLobbyCategoryList } from "@tgs-web-nx/core/features";

import GamesWrapper from "./GamesWrapper";

const NonLobbyCategory = () => {
  const { gameList, isLoading, total } = useGetNonLobbyCategoryList();

  return <GamesWrapper gameList={gameList} isLoading={isLoading} totalGames={total} />;
};

export default NonLobbyCategory;
