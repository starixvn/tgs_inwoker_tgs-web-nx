import { useFavoriteList } from "@/core/feature/game/hooks/useFavoriteList";
import { useGameSearch } from "@/core/feature/game/hooks/useGameSearch";
import { useGameType } from "@/core/feature/game/hooks/useGameType";
import { useGpCode } from "@/core/feature/game/hooks/useGpCode";
import { useProvider } from "@/core/feature/game/hooks/useProvider";
import { GameItem } from "@/core/models/dto/game/GetGameListResDto";
import { ProviderDto } from "@/core/models/dto/game/GetProviderListResDto";
import { GameTypeEnum } from "@/core/types/GameTypeEnum";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import React, { createContext } from "react";
import { useTagFilter } from "@/core/feature/game/hooks/useFilter/useTagFilter";
import { useProviderFilter } from "@/core/feature/game/hooks/useFilter/useProviderFilter";
import { FilterTag, FilterTagTypeEnum } from "@/core/feature/game/types";

export const initialState: {
  // provider
  providerList: ProviderDto[];
  // gameType
  activeGameType: GameTypeEnum;
  handleChangeGameType: (newGameType: GameTypeEnum) => void;
  activeGameTypeKey: string;
  // provider
  gpCode: string;
  handleChangeGpCode: (newGpCode: string) => void;
  updateGpCodeList: (gameItemList: GameItem[]) => void;
  // filterTag
  activeFilterTag: FilterTag;
  handleChangeActiveFilterTag: (newFilterTag: FilterTag) => void;
  filterTagList: FilterTag[];
  // providerFilterTag
  activeProviderFilterTag: FilterTag;
  handleChangeActiveProviderFilterTag: (newFilterTag: FilterTag) => void;
  providerFilterTagList: FilterTag[];
  // favorite
  favoriteList: number[];
  fetchFavoriteList: () => Promise<void>;
  // search
  searchString: string;
  handleChangeSearch: (searchString: string) => void;
} = {
  // provider
  providerList: [],
  // gameType
  activeGameType: GameTypeEnum.NONE,
  handleChangeGameType: () => {},
  activeGameTypeKey: "",
  // provider
  gpCode: "",
  updateGpCodeList: () => {},
  handleChangeGpCode: () => {},
  // filterTag
  activeFilterTag: { name: "All", tagType: FilterTagTypeEnum.ALL },
  handleChangeActiveFilterTag: () => {},
  filterTagList: [],
  // providerFilterTag
  activeProviderFilterTag: { name: "All", tagType: FilterTagTypeEnum.ALL },
  handleChangeActiveProviderFilterTag: () => {},
  providerFilterTagList: [],
  // favorite
  favoriteList: [],
  fetchFavoriteList: () => Promise.resolve(),
  // search
  searchString: "",
  handleChangeSearch: () => {},
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

  const { filterTagList, activeFilterTag, handleChangeActiveFilterTag } = useTagFilter();
  const {
    providerFilterTagList,
    activeProviderFilterTag,
    handleChangeActiveProviderFilterTag,
    updateGpCodeList,
  } = useProviderFilter(providerList);

  const { favoriteList, fetchFavoriteList } = useFavoriteList(activeGameType);
  const { searchString, handleChangeSearch } = useGameSearch();
  const gameTypeList = useGameTypeList();

  const activeGameTypeKey = gameTypeList.find((item) => item.gameType === activeGameType)?.key;

  return (
    <HomeGameContext.Provider
      value={{
        // provider
        providerList,
        // gameType
        activeGameType,
        activeGameTypeKey: activeGameTypeKey ?? "",
        handleChangeGameType,
        // provider
        gpCode,
        handleChangeGpCode,
        // filterTag
        activeFilterTag,
        handleChangeActiveFilterTag,
        filterTagList,
        updateGpCodeList,
        // providerFilterTag
        activeProviderFilterTag,
        handleChangeActiveProviderFilterTag,
        providerFilterTagList,
        // favorite
        favoriteList,
        fetchFavoriteList,
        // search
        searchString,
        handleChangeSearch,
      }}
    >
      {children}
    </HomeGameContext.Provider>
  );
};

export const HomeGameContextConsumer = HomeGameContext.Consumer;
