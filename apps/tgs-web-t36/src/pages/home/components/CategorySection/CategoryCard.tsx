import { GameTypeEnum } from "@tgs-web-nx/constants";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
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
    background-size: cover;
    width: 309px;
    height: 503px;
    flex-shrink: 0;
    cursor: unset;
  }
`;

const CategoryCardContent = styled.div<{ $gameType: number }>`
  height: 100%;
  position: absolute;
  //COCKFIGHT 字段較長,會導致破版
  left: ${({ theme, $gameType }) => ($gameType === GameTypeEnum.COCKFIGHT ? "48%" : "58%")};
  top: 0;
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  margin-top: 5px;
  color: ${({ theme }) => theme.white};
  font-size: 18px;
  font-weight: 700;
  line-height: 20px;
  ${media.sm} {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 18%;
    margin-top: 0;
  }
`;

const Introduction = styled.div`
  position: absolute;
  top: 25%;
  font-size: 12.14px;
  font-weight: 400;
  line-height: 22.4px;
  display: flex;
  justify-content: center;
  padding: 0 20px;
  color: ${({ theme }) => theme.white};
`;

const PlayButton = styled.div`
  position: absolute;
  bottom: 10px;
  left: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 210px;
  height: 44px;
  border-radius: 4px;
  background: linear-gradient(180deg, #5174b8 0%, #16326a 100%);
  color: ${({ theme }) => theme.white};
  cursor: pointer;
`;

type CategoryCardProps = {
  type: string;
  bgUrl: string;
  desktopBgUrl: string;
  introduction: string;
  text: string;
  gameType: GameTypeEnum;
};

const CategoryCard = ({
  type,
  bgUrl,
  desktopBgUrl,
  introduction,
  text,
  gameType,
}: CategoryCardProps) => {
  const history = useHistory();
  const { handleChangeGameType } = useHomeGameContext();
  const { isMobileSize } = useRwd();

  const handleClick = () => {
    handleChangeGameType(gameType);
    history.push(`/main/${type}`);
  };

  return isMobileSize ? (
    <CategoryCardBg onClick={handleClick} $bgUrl={bgUrl}>
      <CategoryCardContent $gameType={gameType}>
        <Text>{text}</Text>
      </CategoryCardContent>
    </CategoryCardBg>
  ) : (
    <CategoryCardBg $bgUrl={desktopBgUrl}>
      <Text>{text}</Text>
      <Introduction>{introduction}</Introduction>
      <PlayButton onClick={handleClick}>Play Now</PlayButton>
    </CategoryCardBg>
  );
};

export default CategoryCard;
