import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import { useGetHomeCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { useEffect, useMemo } from "react";
import MonthItem from "../../../MonthItem";
import News from "../../../News";
import DepositProgress from "../../../DepositProgress";
import bg from "@/assets/t29/images/home/home_bg.png";
import sport from "@/assets/t29/images/home/home_sport.png";
import live_casino from "@/assets/t29/images/home/home_live_casino.png";
import slot from "@/assets/t29/images/home/home_slot.png";
import lottery from "@/assets/t29/images/home/home_lottery.png";
import fishing from "@/assets/t29/images/home/home_fishing.png";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

const DesktopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* height: 314px; */
  margin: 0 auto;
  padding: 15px 0px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 8px 0px 34px 0px;
  width: 100%;
`;

const CategoryImage = styled.div<{ $imageUrl: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 250px;
  position: relative;
  aspect-ratio: 250/200;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: contain;
  background-repeat: repeat;
  padding: 15px 0px;
  cursor: pointer;
`;

const CategoryName = styled.div`
  color: #333;
  font-size: 0.9375rem;
  font-weight: 700;
  text-align: center;
`;

const ContentWarpper = styled.div`
  display: flex;
  flex-direction: column;
`;

type GameTypeItem = {
  key: string;
  name: string;
  imgUrl: string;
  text: string | any;
  gameType: GameTypeEnum;
};

const HomeCategory = () => {
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const { handleChangeGameType } = useHomeGameContext();
  const { hotGameList, recommendGameList } = useGetHomeCategoryList();

  const handleClick = (gameTypeItem: GameTypeItem) => {
    handleChangeGameType(gameTypeItem.gameType);
    history.push(`/main/${gameTypeItem.key}`);
  };

  if (isDesktopSize) {
    return (
      <DesktopContainer>
        <ContentWarpper>
          <div style={{ display: "flex" }}>
            <MonthItem dataList={hotGameList} />
            <MonthItem dataList={recommendGameList} />
          </div>
          <div style={{ display: "flex" }}>
            <News />
            <DepositProgress />
          </div>
        </ContentWarpper>
      </DesktopContainer>
    );
  }
};

export default HomeCategory;
