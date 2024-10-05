import { useGetNonLobbyCategoryList } from "@tgs-web-nx/core/features";

import GamesWrapper from "./GamesWrapper";
import { GamesWrapperBlock } from "./style";

const NonLobbyCategory = () => {
  const { gameList, isLoading, total } = useGetNonLobbyCategoryList();
  return (
    <GamesWrapperBlock>
      <GamesWrapper gameList={gameList} isLoading={isLoading} totalGames={total} />
    </GamesWrapperBlock>
  );
};

export default NonLobbyCategory;
