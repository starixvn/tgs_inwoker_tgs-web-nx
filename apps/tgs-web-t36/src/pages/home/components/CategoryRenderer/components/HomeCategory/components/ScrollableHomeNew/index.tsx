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
import HomeGameCard from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/HomeGameCard";
import { media } from "@/theme/breakpoints";
import CategoryLabel from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/CategoryLabel";
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
`;

const MoreButton = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.grey05};
  font-size: 15px;
  font-weight: 400;
  line-height: 14px;

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
  max-height: 195px;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 20.9%; //max-height: 194 /figma mobile height:926
  gap: 8px;
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

const ScrollableHomeNew = () => {
  const history = useHistory();
  const { handleChangeGameType, handleChangeActiveFilterTag } = useHomeGameContext();
  const { newGameList } = useGetHomeCategoryList();
  const { isMobileSize } = useRwd();
  const hasMappingData = !!newGameList.length;

  const handleClick = () => {
    //active new filter
    handleChangeActiveFilterTag({ name: "New", tagType: FilterTagTypeEnum.NEW });
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
        <CategoryLabel text={i18n.t("slot.newGame")} />
        <MoreButtonWrapper>
          <MoreButton onClick={handleClick}>{i18n.t("common.more")} </MoreButton>
          {isMobileSize && <img src={arrowRight} alt="right" />}
        </MoreButtonWrapper>
      </CategoryTitle>
      <CategoryContent>
        {hasMappingData &&
          newGameList
            .slice(0, SHOW_CATEGORY_AMOUNT)
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

export default ScrollableHomeNew;
