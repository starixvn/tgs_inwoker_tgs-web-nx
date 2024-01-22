import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import useHomeCategoryList from "@/hooks/home/useHomeCategoryList";

const DesktopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 314px;
  margin: 0 auto;
  padding: 15px 0px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 8px 0px 34px 0px;
  width: 100%;
`;

const CategoryImage = styled.div<{ $imageUrl: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 250px;
  position: relative;
  aspect-ratio: 250/200;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: contain;
  padding: 15px 0px;
  cursor: pointer;
`;

const CategoryName = styled.div`
  color: #333;
  font-size: 0.9375rem;
  font-weight: 700;
  text-align: center;
`;

type GameTypeItem = {
  key: string;
  name: string;
  imgUrl: string;
  text: string | any;
  gameType: GameTypeEnum;
};

const HomeCategory = () => {
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const { handleChangeGameType } = useHomeGameContext();
  const homeCategoryList = useHomeCategoryList();

  const handleClick = (gameTypeItem: GameTypeItem) => {
    handleChangeGameType(gameTypeItem.gameType);
    history.push(`/main/${gameTypeItem.key}`);
  };

  if (isDesktopSize) {
    return (
      <DesktopContainer>
        {homeCategoryList.map((item) => {
          return (
            <CategoryWrapper key={item.key}>
              <CategoryImage
                $imageUrl={item.imgUrl}
                onClick={() => handleClick(item)}
              ></CategoryImage>
              <CategoryName>{item.text}</CategoryName>
            </CategoryWrapper>
          );
        })}
      </DesktopContainer>
    );
  }
};

export default HomeCategory;
