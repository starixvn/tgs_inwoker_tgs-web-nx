import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { GameTypeEnum, SHOW_CATEGORY_AMOUNT } from "@tgs-web-nx/constants";
import { Common, i18n } from "@tgs-web-nx/utils";
import { useGetHomeCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router-dom";
import HomeGameCard from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/HomeGameCard";
import { media } from "@/theme/breakpoints";
import CategoryLabel from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/CategoryLabel";
import arrowRight from "@/assets/t36/images/home/arrow_right.png";

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
  color: ${({ theme }) => theme.white};
  font-size: 19.5px;
  font-weight: 400;
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
    gap: 14px;
    scroll-snap-type: unset;
    max-height: 207px;
    flex-direction: row;

    &::-webkit-scrollbar {
      height: 12px;
      background-color: ${({ theme }) => theme.g5};
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(32, 32, 32, 0.5);
      border-radius: 8px;
      background-color: ${({ theme }) => theme.g5};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px ${({ theme }) => theme.g8};
      background-color: ${(props) => props.theme.mainBackground};
    }
  }
`;

const ScrollableHomeHot = () => {
  const history = useHistory();
  const { handleChangeGameType } = useHomeGameContext();
  const { hotGameList } = useGetHomeCategoryList();
  const hasMappingData = !!hotGameList.length;

  const handleClick = () => {
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
        <CategoryLabel text={i18n.t("slot.hotGame")} />
        <MoreButtonWrapper>
          <MoreButton onClick={handleClick}>{i18n.t("common.more")} </MoreButton>
          <img src={arrowRight} alt="right" />
        </MoreButtonWrapper>
      </CategoryTitle>
      <CategoryContent>
        {hasMappingData &&
          hotGameList
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
                tag={"hot"}
              />
            ))}
      </CategoryContent>
    </HomeCategorySection>
  );
};

export default ScrollableHomeHot;
