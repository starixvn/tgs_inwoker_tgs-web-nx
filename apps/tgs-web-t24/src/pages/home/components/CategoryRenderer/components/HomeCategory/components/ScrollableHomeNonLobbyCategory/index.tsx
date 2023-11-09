import { useHistory } from "react-router-dom";
import styled from "styled-components";
import HomeGameCard from "../HomeGameCard";
import tabBg from "@/assets/t23/images/home/tabBg.svg";
import config from "@/config/config";
import { GameItem } from "@/core/models/dto/game/GetGameListResDto";
import { useAccountStore } from "@/core/stores/useAccountStore";
import Common from "@/core/utils/Common";

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

const ScrollableHomeNonLobbyCategory = ({
  title,
  dataList,
  isLoading
}: Props) => {
  const { account } = useAccountStore();
  const history = useHistory();
  // const [filteredGameList, setFilteredGameList] = useState<any[]>([]);
  // const [visibleGameCount, setVisibleGameCount] = useState(showDataLength);
  // const [isLoading, setIsLoading] = useState(false);
  // const { isMobileSize, isDesktopSize } = useRwd();

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

  // const launchGame = (gameId: number, gpcode: string) => {
  //   if (!account.token) {
  //     history.push("/login");
  //     return;
  //   }

  //   Common.closePreviousPopup();
  //   Common.PopupCenter(`/joingame/${gameId}/${gpcode}`, "gamewindow");
  // };

  // console.log("dataList", dataList);

  return (
    <HomeCategorySection>
      <CategoryTab>
        <CategoryTitle>{title}</CategoryTitle>
      </CategoryTab>
      <CategoryContent>
        {!!dataList.length &&
          dataList.map((gameItem) => (
            <HomeGameCard
              key={gameItem.id}
              gameItem={gameItem}
              isActive={gameItem.isactive}
              imageUrl={`${config.sourceUrl}${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${gameItem.code}.jpg`}
            />
          ))}
        {!dataList.length && !isLoading && <div>No data</div>}
      </CategoryContent>
    </HomeCategorySection>
  );
};

export default ScrollableHomeNonLobbyCategory;
