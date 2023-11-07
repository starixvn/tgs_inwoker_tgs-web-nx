import tabBg from "@/assets/t23/images/home/tabBg.svg";
import Loading from "@/components/UI/Loading";
import GameCard from "@/components/pages/home/components/GameCard";
import config from "@/config/config";
import Common from "@/core/utils/Common";
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
  padding: 12px 0px 12px 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 30vh;
  gap: 12px;
  border-radius: 0px 0px 0px 20px;
  background-color: ${({ theme }) => theme.mainDarkBackground};
`;

type Props = {
  title: string;
  dataList: GameItem[];
  isLoading: boolean;
};

const ScrollableHomeCategoryFolder = ({
  title,
  dataList,
  isLoading,
}: Props) => {
  // const [visibleGameCount, setVisibleGameCount] = useState(showDataLength);
  // const { isMobileSize, isDesktopSize } = useRwd();

  const hasMappingData = !!dataList.length;

  // const statusMap = groupBy_gameType.reduce<{ [key in string]: number }>(
  //   (accumulator, groupByGameItem) => {
  //     groupByGameItem.forEach((item) => {
  //       accumulator[item.gpcode] = item.status;
  //     });
  //     return accumulator;
  //   },
  //   {}
  // );

  // const handleLoadMoreClick = () => {
  //   setVisibleGameCount(visibleGameCount + showDataLength);
  // };

  return (
    <>
      <HomeCategorySection>
        <CategoryTab>
          <CategoryTitle>{title}</CategoryTitle>
        </CategoryTab>
        <CategoryContent>
          {hasMappingData &&
            dataList.map((gameItem) => (
              <GameCard
                key={gameItem.id}
                gameItem={gameItem}
                isActive={gameItem.isactive}
                imageUrl={`${config.sourceUrl
                  }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${gameItem.code
                  }.jpg`}
              />
            ))}
        </CategoryContent>
      </HomeCategorySection>

      <Loading show={isLoading} />
    </>
  );
};

export default ScrollableHomeCategoryFolder;
