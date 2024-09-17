import { useGetAllGameListOfProvider } from "@tgs-web-nx/core/features";

import NonLobbyWrapper from "../NonLobbyCategory/NonLobbyWrapper";

const NonLobbyProvider: React.FC<{ isHideProviderDropdown?: boolean }> = ({
  isHideProviderDropdown,
}) => {
  const { gameList, isLoading } = useGetAllGameListOfProvider();

  return (
    <NonLobbyWrapper
      isHideProviderDropdown={isHideProviderDropdown}
      gameList={gameList}
      isLoading={isLoading}
    />
  );
};

export default NonLobbyProvider;
