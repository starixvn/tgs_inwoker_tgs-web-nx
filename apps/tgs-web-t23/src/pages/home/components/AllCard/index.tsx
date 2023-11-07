import dots from "@/assets/t23/images/home/dots.svg";
import { useGameType } from "@/core/feature/game/hooks/useGameType";
import { GameTypeEnum } from "@/core/types/GameTypeEnum";
import { media } from "@/theme/breakpoints";
import styled from "styled-components";

const AllCardBg = styled.div`
  width: calc(30.3% - 10px);
  position: relative;
  cursor: pointer;
  aspect-ratio: 110 / 142;

  ${media.sm} {
    width: calc(19.2% - 30px);
    min-width: 190px;
    aspect-ratio: 190 / 230;
  }
`;

const AllCardContent = styled.div`
  width: 100%;
`;

const AllIcon = styled.div`
  position: absolute;
  width: 100%;
  height: 77%;
  left: 0;
  top: 0;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.lighterGray};
  background: ${(props) => props.theme.mainDarkBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${media.sm} {
    height: 82.6%;;
  }
`;

const Text = styled.div`
  color: ${(props) => props.theme.lighterGray};
  font-size: 0.875rem;
  font-weight: 400;
  margin-top: 8px;
`;

const AllCard = () => {
  const { handleChangeGameType } = useGameType();

  return (
    <AllCardBg onClick={() => handleChangeGameType(GameTypeEnum.SLOT)}>
      <AllCardContent>
        <AllIcon>
          <img src={dots} alt="view all" />
          <Text>All</Text>
        </AllIcon>
      </AllCardContent>
    </AllCardBg>
  );
};

export default AllCard;
