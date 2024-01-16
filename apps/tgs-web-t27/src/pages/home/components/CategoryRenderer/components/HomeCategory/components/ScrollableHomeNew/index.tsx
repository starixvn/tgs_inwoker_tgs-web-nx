import styled from "styled-components";
import { GameItem } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import { GameTypeEnum, SHOW_CATEGORY_AMOUNT } from "@tgs-web-nx/constants";
import { Common } from "@tgs-web-nx/utils";
import { useGetHomeCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import Loading from "@/components/UI/Loading";
import AllCard from "@/pages/home/components/AllCard";
import HomeGameCard from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/HomeGameCard";
import { media } from "@/theme/breakpoints";
import label_icon from "@/assets/t27/images/home/label-icon.svg";
import CategoryLabel from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/CategoryLabel";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import { useHistory } from "react-router-dom";

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
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  color: ${({ theme }) => theme.white};
  font-size: 19.5px;
  font-weight: 400;
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

const ScrollableHomeNew = () => {
  const history = useHistory();
  const { handleChangeGameType } = useHomeGameContext();
  const { newGameList } = useGetHomeCategoryList();
  const hasMappingData = !!newGameList.length;
  const gameTypeList = useGameTypeList();

  const handleViewAllClick = (gameType: GameTypeEnum) => {
    handleChangeGameType(gameType);
    const activeGameTypeKey = gameTypeList.find((item) => item.gameType === gameType)?.key;
    history.push(`/main/${activeGameTypeKey}`);
  };

  return (
    <>
      <HomeCategorySection>
        <CategoryTitle><CategoryLabel imageUrl={label_icon} text={"New"} /></CategoryTitle>
        <CategoryContent>
          {hasMappingData &&
            newGameList
              .slice(0, SHOW_CATEGORY_AMOUNT)
              .map((gameItem) => (
                <HomeGameCard
                  key={gameItem.id}
                  gameItem={gameItem}
                  isActive={gameItem.isactive}
                  imageUrl={`${config.sourceUrl
                    }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${gameItem.code
                    }.jpg`}
                  tag={"new"}
                />
              ))}
          {newGameList.length > SHOW_CATEGORY_AMOUNT && (
            <AllCard onClick={() => handleViewAllClick(GameTypeEnum.SLOT)} />
          )}
        </CategoryContent>
      </HomeCategorySection>
    </>
  );
};

export default ScrollableHomeNew;
