import styled from "styled-components";
import { GameItem } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import { GameTypeEnum, SHOW_CATEGORY_AMOUNT } from "@tgs-web-nx/constants";
import { Common } from "@tgs-web-nx/utils";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import Loading from "@/components/UI/Loading";
import AllCard from "@/pages/home/components/AllCard";
import HomeGameCard from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/HomeGameCard";
import { media } from "@/theme/breakpoints";

const HomeCategorySection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;
`;

const CategoryTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0px;
  gap: 10px;
  align-self: stretch;
  color: ${({ theme }) => theme.primary};
  font-size: 1.78rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const CategoryContent = styled.div`
  width: 100%;
  max-height: 150px;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 16.2%; //max-height: 150 /figma mobile height:926
  gap: 8px;
  background-color: ${({ theme }) => theme.mainDarkBackground};

  ${media.sm} {
    max-height: 270px;
    gap: 25px;
    scroll-snap-type: unset;
    height: 20.9%;
    padding-bottom: 5px;

    &::-webkit-scrollbar {
      height: 12px;
      background-color: ${({ theme }) => theme.gray30};
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(32, 32, 32, 0.5);
      border-radius: 8px;
      background: ${(props) => props.theme.mainDarkBackground};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px ${({ theme }) => theme.gray10};
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
  const { handleChangeGameType } = useHomeGameContext();

  const hasMappingData = !!dataList.length;

  return (
    <>
      <HomeCategorySection>
        <CategoryTitle>{title}</CategoryTitle>
        <CategoryContent>
          {hasMappingData &&
            dataList
              .slice(0, SHOW_CATEGORY_AMOUNT)
              .map((gameItem) => (
                <HomeGameCard
                  key={gameItem.id}
                  gameItem={gameItem}
                  isActive={gameItem.isactive}
                  imageUrl={`${config.sourceUrl
                    }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${gameItem.code
                    }.jpg`}
                />
              ))}
          {dataList.length > SHOW_CATEGORY_AMOUNT && (
            <AllCard onClick={() => handleChangeGameType(GameTypeEnum.SLOT)} />
          )}
        </CategoryContent>
      </HomeCategorySection>

      <Loading show={isLoading} />
    </>
  );
};

export default ScrollableHomeCategoryFolder;
