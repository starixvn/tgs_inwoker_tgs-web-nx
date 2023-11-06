
import { useGetHomeCategoryList } from "@/core/feature/game/useGetHomeCategoryList";
import styled from "styled-components";
import ScrollableHomeCategoryFolder from "./components/ScrollableHomeCategoryFolder";

const HomeCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const HomeCategory = () => {
  const { hotGameList, newGameList, recommendGameList, isLoading } = useGetHomeCategoryList();
  const homeCategoryDataList = [
    { title: "Hot Games", dataList: hotGameList },
    { title: "New Games", dataList: newGameList },
    { title: "Recommend", dataList: recommendGameList }
  ];

  return (
    <HomeCategoryContainer>
      {!!homeCategoryDataList.length && homeCategoryDataList.map((item, index) => (
        <ScrollableHomeCategoryFolder
          key={index}
          title={item.title}
          dataList={item.dataList}
          isLoading={isLoading}
        />
      ))}
    </HomeCategoryContainer>
  );
};

export default HomeCategory;
