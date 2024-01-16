import { GameTypeEnum } from "@tgs-web-nx/constants";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useHomeGameContext } from "@tgs-web-nx/core/features";

const CategoryCardBg = styled.div<{ $bgUrl: string }>`
  width: calc(50% - 6px);
  position: relative;
  cursor: pointer;
  aspect-ratio: 195.03 / 197.73;
  background-image: url(${({ $bgUrl }) => $bgUrl});
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
`;

const CategoryCardContent = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-repeat: no-repeat;
  background-size: contain;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 15.36px 0;
`;

const Text = styled.div`
  color:${({ theme }) => theme.white};
  margin-left: 5px;
  font-size: 21.4px;
  font-weight: 900;
  text-transform: uppercase;
`;

type CategoryCardProps = {
  type: string;
  bgUrl: string;
  imageUrl: string;
  iconUrl: string;
  text: string;
  gameType: GameTypeEnum;
};

const CategoryCard = ({ type, bgUrl, imageUrl, iconUrl, text, gameType }: CategoryCardProps) => {
  const history = useHistory();
  const { handleChangeGameType } = useHomeGameContext();

  const handleClick = () => {
    handleChangeGameType(gameType);
    history.push(`/main/${type}`);
  };

  return (
    <CategoryCardBg onClick={handleClick} $bgUrl={bgUrl}>
      <CategoryCardContent $imageUrl={imageUrl}>
        <LabelWrapper>
          <img src={iconUrl} alt={text} />
          <Text>{text}</Text>
        </LabelWrapper>
      </CategoryCardContent>
    </CategoryCardBg>
  );
};

export default CategoryCard;
