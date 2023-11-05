import React, { createContext } from "react";
import { useProvider } from "@/core/feature/game/hooks/useProvider";
import { useGameType } from "@/core/feature/game/hooks/useGameType";
import { useGpCode } from "@/core/feature/game/hooks/useGpCode";
import { ProviderDto } from "@/core/models/dto/game/GetProviderListResDto";
import { GameTypeEnum } from "@/core/types/GameTypeEnum";
import { FilterTag, FilterTagTypeEnum, useFilterTag } from "@/core/feature/game/hooks/useFilterTag";
import { GameItem } from "@/core/models/dto/game/GetGameListResDto";
import { useFavoriteList } from "@/core/feature/game/hooks/useFavoriteList";

export const initialState: {
  providerList: ProviderDto[];
  activeGameType: GameTypeEnum;
  handleChangeGameType: (newGameType: GameTypeEnum) => void;
  gpCode: string;
  handleChangeGpCode: (newGpCode: string) => void;
  activeFilterTag: FilterTag;
  handleChangeActiveFilterTag: (newFilterTag: FilterTag) => void;
  filterTagList: FilterTag[];
  updateGpCodeList: (gameItemList: GameItem[]) => void;
  favoriteList: number[];
  fetchFavoriteList: () => Promise<void>;
} = {
  providerList: [],
  activeGameType: GameTypeEnum.NONE,
  handleChangeGameType: () => {},
  gpCode: "",
  handleChangeGpCode: () => {},
  activeFilterTag: { name: "All", tagType: FilterTagTypeEnum.ALL },
  handleChangeActiveFilterTag: () => {},
  filterTagList: [],
  updateGpCodeList: () => {},
  favoriteList: [],
  fetchFavoriteList: () => Promise.resolve(),
};

export const HomeGameContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
};

export const HomeGameContextProvider = ({ children }: ProviderProps) => {
  const { providerList } = useProvider();
  const { activeGameType, handleChangeGameType } = useGameType();
  const { gpCode, handleChangeGpCode } = useGpCode();

  const { activeFilterTag, handleChangeActiveFilterTag, filterTagList, updateGpCodeList } =
    useFilterTag(providerList, activeGameType);

  const { favoriteList, fetchFavoriteList } = useFavoriteList(activeGameType);

  return (
    <HomeGameContext.Provider
      value={{
        providerList,
        activeGameType,
        handleChangeGameType,
        gpCode,
        handleChangeGpCode,
        activeFilterTag,
        handleChangeActiveFilterTag,
        filterTagList,
        updateGpCodeList,
        favoriteList,
        fetchFavoriteList,
      }}
    >
      {children}
    </HomeGameContext.Provider>
  );
};

export const HomeGameContextConsumer = HomeGameContext.Consumer;
