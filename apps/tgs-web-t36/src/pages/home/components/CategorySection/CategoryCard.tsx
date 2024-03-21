import { GameTypeEnum } from "@tgs-web-nx/constants";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { media } from "@/theme/breakpoints";

const CategoryCardBg = styled.div<{ $bgUrl: string }>`
  width: calc(50% - 6px);
  position: relative;
  cursor: pointer;
  aspect-ratio: 192 / 82;
  background-image: url(${({ $bgUrl }) => $bgUrl});
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;

  ${media.sm} {
    width: calc(25% - 15.67px);
    aspect-ratio: 326 / 326;
    max-height: 326px;
  }
`;

const CategoryCardContent = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-repeat: no-repeat;
  background-size: contain;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 15.36px 0;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
`;

type CategoryCardProps = {
  type: string;
  bgUrl: string;
  // imageUrl: string;
  // iconUrl: string;
  text: string;
  gameType: GameTypeEnum;
};

const CategoryCard = ({ type, bgUrl, text, gameType }: CategoryCardProps) => {
  const history = useHistory();
  const { handleChangeGameType } = useHomeGameContext();

  const handleClick = () => {
    handleChangeGameType(gameType);
    history.push(`/main/${type}`);
  };

  return (
    <CategoryCardBg onClick={handleClick} $bgUrl={bgUrl}>
      <CategoryCardContent>
        <LabelWrapper>
          {/* <img src={iconUrl} alt={text} /> */}
          {/* <Text>{text}</Text> */}
        </LabelWrapper>
      </CategoryCardContent>
    </CategoryCardBg>
  );
};

export default CategoryCard;
