import tabBg from "@/assets/t23/images/home/tabBg.svg";
import Loading from "@/components/UI/Loading";
import config from "@/config/config";
import { SHOW_CATEGORY_AMOUNT } from "@/core/constants/games";
import { GameItem } from "@/core/models/dto/game/GetGameListResDto";
import Common from "@/core/utils/Common";
import AllCard from "@/pages/home/components/AllCard";
import GameCard from "@/pages/home/components/GameCard";
import { media } from "@/theme/breakpoints";
import styled from "styled-components";

const HomeCategorySection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 13px;
`;

const CategoryTab = styled.div`
  width: 184px;
  height: 48px;
  background-image: url(${tabBg});
  background-size: contain;
  padding: 15.5px 15px;
`;

const CategoryTitle = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 0.875rem;
`;

const CategoryContent = styled.div`
  width: 100%;
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  box-sizing: border-box;
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 36vh;
  gap: 12px;
  border-radius: 0px 0px 0px 20px;
  background-color: ${({ theme }) => theme.mainDarkBackground};

  ${media.sm} {
    height: 58vh;
    gap: 22px;
    max-width: 1200px;
    margin: 0 auto;
    scroll-snap-type: unset;
    
    &::-webkit-scrollbar {
      height: 12px;
      background-color: #1d1d1d40;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(32, 32, 32, 0.5);
      border-radius: 8px;
      background: ${(props) => props.theme.mainDarkBackground};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(32, 32, 32, 0.5);
      background-color: ${(props) => props.theme.mainLightBackground};
    }
  }
`;

type Props = {
  title: string;
  dataList: GameItem[];
  isLoading: boolean;
};

const ScrollableHomeCategoryFolder = ({ title, dataList, isLoading }: Props) => {
  const hasMappingData = !!dataList.length;

  return (
    <>
      <HomeCategorySection>
        <CategoryTab>
          <CategoryTitle>{title}</CategoryTitle>
        </CategoryTab>
        <CategoryContent>
          {hasMappingData &&
            dataList.slice(0, SHOW_CATEGORY_AMOUNT).map((gameItem) => (
              <GameCard
                key={gameItem.id}
                gameItem={gameItem}
                isActive={gameItem.isactive}
                imageUrl={`${config.sourceUrl
                  }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${gameItem.code
                  }.jpg`}
              />
            ))}
          {dataList.length > SHOW_CATEGORY_AMOUNT && <AllCard />}
        </CategoryContent>
      </HomeCategorySection>

      <Loading show={isLoading} />
    </>
  );
};

export default ScrollableHomeCategoryFolder;
