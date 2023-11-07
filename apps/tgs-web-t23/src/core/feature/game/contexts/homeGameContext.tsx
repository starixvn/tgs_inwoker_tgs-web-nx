import { useFavoriteList } from "@/core/feature/game/hooks/useFavoriteList";
import { FilterTag, FilterTagTypeEnum, useFilterTag } from "@/core/feature/game/hooks/useFilterTag";
import { useGameSearch } from "@/core/feature/game/hooks/useGameSearch";
import { useGameType } from "@/core/feature/game/hooks/useGameType";
import { useGpCode } from "@/core/feature/game/hooks/useGpCode";
import { useProvider } from "@/core/feature/game/hooks/useProvider";
import { GameItem } from "@/core/models/dto/game/GetGameListResDto";
import { ProviderDto } from "@/core/models/dto/game/GetProviderListResDto";
import { GameTypeEnum } from "@/core/types/GameTypeEnum";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import React, { createContext } from "react";

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
  activeGameTypeKey: string;
  firstRowTags: FilterTag[];
  secondRowTags: FilterTag[];
  activeFirstRowFilterTag: FilterTag;
  handleChangeActiveFirstRowFilterTag: (newFilterTag: FilterTag) => void;
  activeSecondRowFilterTag: FilterTag;
  handleChangeActiveSecondRowFilterTag: (newFilterTag: FilterTag) => void;
  searchString: string;
  handleChangeSearch: (searchString: string) => void;
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
  activeGameTypeKey: "",
  firstRowTags: [],
  secondRowTags: [],
  activeFirstRowFilterTag: { name: "All", tagType: FilterTagTypeEnum.ALL },
  handleChangeActiveFirstRowFilterTag: () => {},
  activeSecondRowFilterTag: { name: "All", tagType: FilterTagTypeEnum.ALL },
  handleChangeActiveSecondRowFilterTag: () => {},
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
  const { activeFilterTag,
    handleChangeActiveFilterTag,
    filterTagList,
    firstRowTags,
    secondRowTags,
    updateGpCodeList,
    handleChangeActiveFirstRowFilterTag,
    handleChangeActiveSecondRowFilterTag,
    activeFirstRowFilterTag,
    activeSecondRowFilterTag
  } =
    useFilterTag(providerList, activeGameType);

  const { favoriteList, fetchFavoriteList } = useFavoriteList(activeGameType);
  const { searchString, handleChangeSearch } = useGameSearch();
  const gameTypeList = useGameTypeList();
  const activeGameTypeKey = gameTypeList.find((item) => item.gameType === activeGameType)?.key;

  return (
    <HomeGameContext.Provider
      value={{
        providerList,
        activeGameType,
        activeGameTypeKey: activeGameTypeKey ?? "",
        handleChangeGameType,
        gpCode,
        handleChangeGpCode,
        activeFilterTag,
        handleChangeActiveFilterTag,
        filterTagList,
        firstRowTags,
        secondRowTags,
        updateGpCodeList,
        favoriteList,
        fetchFavoriteList,
        handleChangeActiveFirstRowFilterTag,
        handleChangeActiveSecondRowFilterTag,
        activeFirstRowFilterTag,
        activeSecondRowFilterTag,
        searchString,
        handleChangeSearch
      }}
    >
      {children}
    </HomeGameContext.Provider>
  );
};

export const HomeGameContextConsumer = HomeGameContext.Consumer;
