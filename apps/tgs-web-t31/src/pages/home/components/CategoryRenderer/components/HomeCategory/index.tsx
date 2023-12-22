import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useGetHomeCategoryList } from "@tgs-web-nx/core/features";
import { useEffect, useState } from "react";
import { GameItem } from "@tgs-web-nx/types";
import MonthItem from "../../../MonthItem";
import News from "../../../News";
import DepositProgress from "../../../DepositProgress";
import Marquee from "../../../CardPrompt/components/Marquee";
import OnlineUser from "../../../CardPrompt/components/OnlineUser";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import { theme } from "@/theme";

const DesktopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding: 15px 0px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    flex-direction: column;
  }
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
  const { isDesktopSize } = useRwd();
  const { hotGameList, recommendGameList, isLoading, isTableGameLoading } =
    useGetHomeCategoryList();

  const [hotList, setHotList] = useState<GameItem[]>([]);
  const [recommendList, setRecommendList] = useState<GameItem[]>([]);

  useEffect(() => {
    setHotList(hotGameList);
  }, [hotGameList]);

  useEffect(() => {
    setRecommendList(recommendGameList);
  }, [recommendGameList]);

  if (isDesktopSize) {
    return (
      <DesktopContainer>
        <CardPromptContainer $isDesktopSize={isDesktopSize}>
          <OnlineUser color={theme.white} />
          <Marquee />
        </CardPromptContainer>
        <ContentWarpper>
          <MonthItemContainer>
            {!isLoading && (
              <MonthItem
                dataList={hotList}
                title="HOT GAMES THIS MONTH"
                loadMore={() => {
                  setHotList(hotList.concat(hotGameList));
                }}
              />
            )}
            {!isTableGameLoading && (
              <MonthItem
                dataList={recommendList}
                title="WINNER OF THE MONTH"
                loadMore={() => {
                  setRecommendList(recommendList.concat(recommendGameList));
                }}
              />
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
