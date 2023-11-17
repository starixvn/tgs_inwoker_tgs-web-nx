import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useHeader, useHomeGameContext } from "@tgs-web-nx/core/features";
import MenuGameTab from "./MenuGameTab";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import vip from "@/assets/t31/images/home/gameType/VIP.png";
import activedVip from "@/assets/t31/images/home/gameType/VIP-1.png";
import promotion from "@/assets/t31/images/home/gameType/Promotion.png";
import activedPromotion from "@/assets/t31/images/home/gameType/Promotion-1.png";
const TabContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const MenuGameTypeList = () => {
  const gameTypeList = useGameTypeList();
  const { activeGameType, handleChangeGameType } = useHomeGameContext();
  return (
    <TabContainer>
      {gameTypeList.map((gameTypeItem) => {
        const { key, activedIconUrl, iconUrl, text, gameType } = gameTypeItem;
        return (
          <MenuGameTab
            key={key}
            imageUrl={iconUrl}
            activedIconUrl={activedIconUrl}
            text={text}
            isActive={gameType === activeGameType}
            onClick={() => handleChangeGameType(gameType)}
          />
        );
      })}
      <MenuGameTab
        imageUrl={vip}
        activedIconUrl={activedVip}
        text={"VIP"}
        isActive={false}
        onClick={() => {}}
      />
      <MenuGameTab
        imageUrl={promotion}
        activedIconUrl={activedPromotion}
        text={i18n.t("common.promotion")}
        isActive={false}
        onClick={() => {}}
      />
    </TabContainer>
  );
};

export default MenuGameTypeList;
