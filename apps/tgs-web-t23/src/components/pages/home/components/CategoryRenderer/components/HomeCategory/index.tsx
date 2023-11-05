
import SocialMedia from "@/components/project/SocialMedia";
import { useGetHomeCategoryList } from "@/core/feature/game/useGetHomeCategoryList";
import { useRwd } from "@/core/hooks/tools/useRwd";
import styled from "styled-components";
import HomeNonLobbyCategory from "./components/HomeNonLobbyCategory";
import ScrollableHomeNonLobbyCategory from "./components/ScrollableHomeNonLobbyCategory";

const HomeCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const HomeCategory = () => {
  const { isMobileSize, isDesktopSize } = useRwd();
  const { hotGameList, newGameList, recommendGameList, isLoading } = useGetHomeCategoryList();
  const homeCategoryDataList = [
    { title: "Hot Games", dataList: hotGameList },
    { title: "New Games", dataList: newGameList },
    { title: "Recommend", dataList: recommendGameList }
  ];

  return (
    <HomeCategoryContainer>
      {!!homeCategoryDataList.length && homeCategoryDataList.map((item, index) => (
        <ScrollableHomeNonLobbyCategory
          key={index}
          title={item.title}
          dataList={item.dataList}
          isLoading={isLoading}
        />
      ))}

      {
        isMobileSize && <HomeNonLobbyCategory
          title={"Follow Us"}
        >
          <SocialMedia />
        </HomeNonLobbyCategory>
      }
    </HomeCategoryContainer>
  );
};

export default HomeCategory;
