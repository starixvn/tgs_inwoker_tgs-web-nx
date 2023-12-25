import styled from "styled-components";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { FilterTagTypeEnum, useHomeGameContext } from "@tgs-web-nx/core/features";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import DesktopVendorTab from "@/pages/home/components/GameTypeTab/desktop/Tab";

const TabContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
    background: ${(props) => props.theme.tertiaryDark};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #53535375;
  }

  &::-webkit-scrollbar-track-piece {
    background: transparent;
  }
`;

const DesktopGameTypeTab = () => {
  const gameTypeList = useGameTypeList();
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  const { handleChangeActiveFilterTag, handleChangeActiveProviderFilterTag, providerList } = useHomeGameContext();

  const allTag = {
    tagType: FilterTagTypeEnum.ALL,
    name: "",
  };

  const switchGameType = (gameType: GameTypeEnum) => {
    handleChangeGameType(gameType);
    // 把filter tag的狀態清空
    handleChangeActiveProviderFilterTag(allTag);
    handleChangeActiveFilterTag(allTag);
  };

  const filteredGameTypeList = gameTypeList.filter((gameTypeItem) => {
    if (providerList.length) {
      const hasData = providerList.some((provider) => {
        return provider.gametypes.includes(gameTypeItem.gameType);
      });
      return hasData;
    }
    return true;
  });

  return (
    <TabContainer>
      {filteredGameTypeList.map((gameTypeItem) => {
        const { key, text, content, gameType } = gameTypeItem;

        return (
          <DesktopVendorTab
            key={key}
            text={text}
            content={content}
            onClick={() => switchGameType(gameType)}
            bgUrl={`/assets/images/home/desktop_gameType/${gameType}.png`}
            iconUrl={`/assets/images/home/desktop_gameType/icon_${gameType}.png`}
          />
        );
      })}
    </TabContainer>
  );
};

export default DesktopGameTypeTab;
