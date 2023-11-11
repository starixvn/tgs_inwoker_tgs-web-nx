import React, { createContext } from "react";
import { GameItem, ProviderDto } from "@tgs-web-nx/types";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useFavoriteList } from "../hooks/useFavoriteList";
import { useProviderFilter } from "../hooks/useFilter/useProviderFilter";
import { useTagFilter } from "../hooks/useFilter/useTagFilter";
import { useGameSearch } from "../hooks/useGameSearch";
import { useGameType } from "../hooks/useGameType";
import { useGpCode } from "../hooks/useGpCode";
import { useProvider } from "../hooks/useProvider";
import { FilterTag, FilterTagTypeEnum } from "../types";

export type GameTypeItem = {
  key: string;
  iconUrl: string;
  text: string | any;
  fontSize: string;
  gameType: GameTypeEnum;
};

const initialState: {
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
  gameTypeList: GameTypeItem[];
};

export const HomeGameContextProvider = ({ children, gameTypeList }: ProviderProps) => {
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
