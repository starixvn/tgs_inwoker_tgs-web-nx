import { GameTypeEnum } from "@tgs-web-nx/constants";
import { ProviderDto } from "@tgs-web-nx/types";
import { createContext, useCallback, useState } from "react";

import { useFavoriteList } from "../hooks/useFavoriteList";
import { useGameByProvider } from "../hooks/useFilter/useGameByProvider";
import { useProviderFilter } from "../hooks/useFilter/useProviderFilter";
import { useTagFilter } from "../hooks/useFilter/useTagFilter";
import { useGameSearch } from "../hooks/useGameSearch";
import { useGameType } from "../hooks/useGameType";
import { useGpCode } from "../hooks/useGpCode";
import { useNavPopupGameType } from "../hooks/useNavPopupGameType";
import { usePagination } from "../hooks/usePagination";
import { useProvider } from "../hooks/useProvider";
import { FilterTag, OrderTypeEnum, TagTypeEnum } from "../types";

export type GameTypeItem = {
  key: string;
  iconUrl: string;
  text: string | any;
  fontSize: string;
  gameType: GameTypeEnum;
  bgUrl?: string;
  iconActiveUrl?: string;
  router?: string;
};

const initialState: {
  // provider
  providerList: ProviderDto[];
  searchedGameProviderCode: string;
  searchedGameProviderName: string;
  handleGamesByProvider: (provider: ProviderDto) => void;
  // hot/new games
  activeTag: TagTypeEnum;
  handleChangeActiveTag: (tag: TagTypeEnum) => void;
  // gameType
  activeGameType: GameTypeEnum;
  handleChangeGameType: (newGameType: GameTypeEnum) => void;
  activeGameTypeKey: string;
  // navGameType
  activeNavPopupGameType: GameTypeEnum;
  handleChangeNavPopupGameType: (newGameType: GameTypeEnum) => void;
  activeNavPopupGameTypeKey: string;
  isHovered: boolean;
  setIsHovered: (isHovered: boolean) => void;
  // provider
  gpCode: string;
  handleChangeGpCode: (newGpCode: string) => void;
  updateGpCodeList: (providers: ProviderDto[]) => void;
  // filterTag
  activeFilterTag: OrderTypeEnum;
  handleChangeActiveFilterTag: (newFilterTag: OrderTypeEnum) => void;
  filterTagList: FilterTag[];
  // providerFilterTag
  activeProviderFilterTag: string[];
  handleChangeActiveProviderFilterTag: (newFilterTag: string[]) => void;
  providerFilterTagList: FilterTag[];
  // favorite
  // favoriteList: number[];
  // fetchFavoriteList: () => Promise<void>;
  // search
  searchString: string;
  handleChangeSearch: (searchString: string) => void;
  setIsEnterGamePortal: (isEnterGamePortal: boolean) => void;
  isEnterGamePortal: boolean;
  // pagination
  pageIndex: number;
  pageSize: number;
  handleChangePageIndex: (pageIndex: number) => void;
} = {
  // provider
  providerList: [],
  searchedGameProviderCode: "",
  searchedGameProviderName: "",
  handleGamesByProvider: () => {},
  // hot/new games
  activeTag: TagTypeEnum.NONE,
  handleChangeActiveTag: () => {},
  // gameType
  activeGameType: GameTypeEnum.NONE,
  handleChangeGameType: () => {},
  activeGameTypeKey: "",
  // navgameType
  activeNavPopupGameType: GameTypeEnum.HOME,
  handleChangeNavPopupGameType: () => {},
  activeNavPopupGameTypeKey: "",
  isHovered: false,
  setIsHovered: () => {},
  // provider
  gpCode: "",
  updateGpCodeList: () => {},
  handleChangeGpCode: () => {},
  // filterTag
  activeFilterTag: OrderTypeEnum.HOT,
  handleChangeActiveFilterTag: () => {},
  filterTagList: [],
  // providerFilterTag
  activeProviderFilterTag: [],
  handleChangeActiveProviderFilterTag: () => {},
  providerFilterTagList: [],
  // favorite
  // favoriteList: [],
  // fetchFavoriteList: () => Promise.resolve(),
  // search
  searchString: "",
  handleChangeSearch: () => {},
  setIsEnterGamePortal: () => {},
  isEnterGamePortal: false,
  // pagination
  pageIndex: 0,
  pageSize: 0,
  handleChangePageIndex: () => {},
};

export const HomeGameContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
  gameTypeList: GameTypeItem[];
};

export const HomeGameContextProvider = ({ children, gameTypeList }: ProviderProps) => {
  const { activeGameType, handleChangeGameType } = useGameType();
  const { activeGameProvider, handleChangeProvider } = useGameByProvider();
  const { activeNavPopupGameType, handleChangeNavPopupGameType, isHovered, setIsHovered } =
    useNavPopupGameType();
  const { gpCode, handleChangeGpCode } = useGpCode();

  const {
    filterTagList,
    activeFilterTag,
    activeTag,
    handleChangeActiveFilterTag,
    handleChangeActiveTag,
  } = useTagFilter();
  const {
    providerFilterTagList,
    activeProviderFilterTag,
    handleChangeActiveProviderFilterTag,
    handleClearActiveProviderFilterTag,
    updateGpCodeList,
  } = useProviderFilter();

  const { providerList } = useProvider(updateGpCodeList);

  // const { favoriteList, fetchFavoriteList } = useFavoriteList(
  //   activeGameType ? activeGameType : GameTypeEnum.SLOT
  // );
  const { searchString, handleChangeSearch } = useGameSearch();

  const SportsType = gameTypeList.find((item) => item.gameType === GameTypeEnum.SPORTS);
  const activeGameTypeKey = gameTypeList.find((item) =>
    //虛擬體育歸類在體育底下
    activeGameType === GameTypeEnum.RNGSPORTS ? SportsType?.key : item.gameType === activeGameType
  )?.key;
  const activeNavPopupGameTypeKey = gameTypeList.find(
    (item) => item.gameType === activeNavPopupGameType
  )?.key;

  const [isEnterGamePortal, setIsEnterGamePortal] = useState<boolean>(false);

  const { pageIndex, pageSize, handleChangePageIndex } = usePagination();

  const handleChangePage = useCallback((newGameType: GameTypeEnum) => {
    if (newGameType !== activeGameType) {
      handleChangeGameType(newGameType);
      handleChangePageIndex(1);
      handleChangeActiveFilterTag(OrderTypeEnum.HOT);
      handleClearActiveProviderFilterTag();
    }
  }, []);

  const [providerName, setProviderName] = useState<string>("");

  const handleGamesByProvider = useCallback((provider: ProviderDto) => {
    handleChangeProvider(provider.code);
    setProviderName(provider.name);
  }, []);

  return (
    <HomeGameContext.Provider
      value={{
        // provider
        providerList,
        searchedGameProviderCode: activeGameProvider,
        searchedGameProviderName: providerName,
        handleGamesByProvider,
        // hot/new games
        activeTag,
        handleChangeActiveTag,
        // gameType
        activeGameType,
        activeGameTypeKey: activeGameTypeKey ?? "",
        activeNavPopupGameTypeKey: activeNavPopupGameTypeKey ?? "",
        handleChangeGameType: handleChangePage,
        // navGameType
        activeNavPopupGameType,
        handleChangeNavPopupGameType,
        isHovered,
        setIsHovered,
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
        // favoriteList,
        // fetchFavoriteList,
        // search
        searchString,
        handleChangeSearch,
        setIsEnterGamePortal,
        isEnterGamePortal,
        // pagination
        pageIndex,
        pageSize,
        handleChangePageIndex,
      }}
    >
      {children}
    </HomeGameContext.Provider>
  );
};

export const HomeGameContextConsumer = HomeGameContext.Consumer;
