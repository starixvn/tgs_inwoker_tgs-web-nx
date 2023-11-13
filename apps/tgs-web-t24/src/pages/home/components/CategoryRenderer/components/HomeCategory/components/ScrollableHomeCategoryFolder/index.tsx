import styled from "styled-components";
import { GameItem } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import { SHOW_CATEGORY_AMOUNT } from "@tgs-web-nx/constants";
import { Common } from "@tgs-web-nx/utils";
import Loading from "@/components/UI/Loading";
import AllCard from "@/pages/home/components/AllCard";
import HomeGameCard from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/HomeGameCard";
import { media } from "@/theme/breakpoints";

const HomeCategorySection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 13px;
`;

const CategoryTab = styled.div`
  width: 100%;
  height: 32px;
  border-left: 3px solid ${({ theme }) => theme.primary};
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CategoryTitle = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.131px;
  margin-left: 14px;
`;

const CategoryContent = styled.div`
  width: 100%;
  max-height: 302px;
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  box-sizing: border-box;
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 33%; //302/926
  gap: 8px;
  border-radius: 0px 0px 0px 20px;
  background-color: ${({ theme }) => theme.mainDarkBackground};

  ${media.sm} {
    height: 56%;
    gap: 30px;
    max-width: 1200px;
    max-height: 600px;
    padding: 40px 20px;
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
            dataList
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
