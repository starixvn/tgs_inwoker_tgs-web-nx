import { useGetAllGameListOfProvider } from "@tgs-web-nx/core/features";

import NonLobbyWrapper from "../NonLobbyCategory/NonLobbyWrapper";

const NonLobbyProvider = () => {
  const { gameList, isLoading } = useGetAllGameListOfProvider();

  return (
    <NonLobbyWrapper isHideProviderDropdown={true} gameList={gameList} isLoading={isLoading} />
  );
};

export default NonLobbyProvider;
