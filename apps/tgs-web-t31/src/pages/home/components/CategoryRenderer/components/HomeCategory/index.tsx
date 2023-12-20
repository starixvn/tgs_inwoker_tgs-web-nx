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
import Marquee from "../../../CardPrompt/components/Marquee";
import OnlineUser from "../../../CardPrompt/components/OnlineUser";
import bg from "@/assets/t29/images/home/home_bg.png";
import sport from "@/assets/t29/images/home/home_sport.png";
import live_casino from "@/assets/t29/images/home/home_live_casino.png";
import slot from "@/assets/t29/images/home/home_slot.png";
import lottery from "@/assets/t29/images/home/home_lottery.png";
import fishing from "@/assets/t29/images/home/home_fishing.png";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import { theme } from "@/theme";

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
    flex-direction: column;
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

const MonthItemContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const NewsContainer = styled.div`
  display: flex;
  gap: 40px;
`;

const ContentWarpper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 14px;
`;

type GameTypeItem = {
  key: string;
  name: string;
  imgUrl: string;
  text: string | any;
  gameType: GameTypeEnum;
};
type Props = {
  $isDesktopSize: boolean;
};
const CardPromptContainer = styled.div<Props>`
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  align-self: stretch;
  width: 100%;
  gap: 7px;
  background: ${({ theme, $isDesktopSize }) =>
    $isDesktopSize ? theme.accountLableText : theme.mainBackground};
`;

const HomeCategory = () => {
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const { handleChangeGameType } = useHomeGameContext();
  const { hotGameList, recommendGameList, isLoading, isTableGameLoading } =
    useGetHomeCategoryList();

  const handleClick = (gameTypeItem: GameTypeItem) => {
    handleChangeGameType(gameTypeItem.gameType);
    history.push(`/main/${gameTypeItem.key}`);
  };

  if (isDesktopSize) {
    return (
      <DesktopContainer>
        <CardPromptContainer $isDesktopSize={isDesktopSize}>
          <OnlineUser color={theme.white} />
          <Marquee />
        </CardPromptContainer>
        <ContentWarpper>
          <MonthItemContainer>
            {!isLoading && <MonthItem dataList={hotGameList} title="HOT GAMES THIS MONTH" />}
            {!isTableGameLoading && (
              <MonthItem dataList={recommendGameList} title="WINNER OF THE MONTH" />
            )}
          </MonthItemContainer>
          <NewsContainer>
            <News />
            <DepositProgress />
          </NewsContainer>
        </ContentWarpper>
      </DesktopContainer>
    );
  }
};

export default HomeCategory;
