import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { GameTypeEnum, SHOW_CATEGORY_AMOUNT } from "@tgs-web-nx/constants";
import { Common, i18n } from "@tgs-web-nx/utils";
import {
  FilterTagTypeEnum,
  useGetHomeCategoryList,
  useHomeGameContext,
} from "@tgs-web-nx/core/features";
import { useHistory } from "react-router-dom";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { media } from "@/theme/breakpoints";
import CategoryLabel from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/CategoryLabel";
import HomeGameCard from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/HomeGameCard";
import arrowRight from "@/assets/t36/images/home/arrow_right.png";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

const HomeCategorySection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 14px;
`;

const CategoryTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  font-size: 19.5px;
  font-weight: 400;

  ${media.sm} {
    background: ${({ theme }) => theme.primary};
    padding: 10px;
  }
`;

const MoreButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const MoreButton = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.grey05};
  font-size: 15px;
  font-weight: 400;
  line-height: 14px;
  height: 30px;
  
  ${media.sm} {
    border-radius: 3px;
    color: ${({ theme }) => theme.white};
    background: linear-gradient(180deg, #2286df 0%, #184c8b 100%);
    padding: 10px;
    cursor: pointer;
  }
`;

const CategoryContent = styled.div`
  width: 100%;
  max-height: 234px;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 23.9%; //max-height: 222 /figma mobile height:926
  gap: 10px;
  background-color: ${({ theme }) => theme.mainBackground};

  ${media.sm} {
    justify-content: start;
    background: transparent;
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    height: 100%;
    max-height: unset;
    flex-direction: row;
  }
`;

const ScrollableHomeRecommend = () => {
  const { recommendGameList } = useGetHomeCategoryList();
  const hasMappingData = !!recommendGameList.length;
  const { handleChangeGameType, handleChangeActiveFilterTag } = useHomeGameContext();
  const history = useHistory();
  const { isMobileSize } = useRwd();

  const handleClick = () => {
    //active recommend filter
    handleChangeActiveFilterTag({ name: "Recommend", tagType: FilterTagTypeEnum.RECOMMEND });
    const gameTypeItem = {
      gameType: GameTypeEnum.SLOT,
      key: "slots",
    };
    handleChangeGameType(gameTypeItem.gameType);
    history.push(`/main/${gameTypeItem.key}`);
  };

  return (
    <HomeCategorySection>
      <CategoryTitle>
        <CategoryLabel text={i18n.t("slot.recommendGame")} />
        <MoreButtonWrapper>
          <MoreButton onClick={handleClick}>{i18n.t("common.more")} </MoreButton>
          {isMobileSize && <img width={9} height={14} src={arrowRight} alt="right" />}
        </MoreButtonWrapper>
      </CategoryTitle>
      <CategoryContent>
        {hasMappingData &&
          recommendGameList
            .slice(0, 8)
            .map((gameItem) => (
              <HomeGameCard
                key={gameItem.id}
                gameItem={gameItem}
                isActive={gameItem.isactive}
                imageUrl={`${
                  config.sourceUrl
                }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                  gameItem.code
                }.jpg`}
                tag={"new"}
              />
            ))}
      </CategoryContent>
    </HomeCategorySection>
  );
};

export default ScrollableHomeRecommend;
