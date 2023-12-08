import styled from "styled-components";
import dots from "@/assets/t23/images/home/dots.svg";
import { media } from "@/theme/breakpoints";

const AllCardBg = styled.div`
  width: calc(30.3% - 5.33px);
  max-width: 130px;
  position: relative;
  cursor: pointer;
  aspect-ratio: 130 / 130;

  ${media.sm} {
    width: calc(24% - 30px);
    min-width: 250px;
    aspect-ratio: 250 / 250;
  }
`;

const AllCardContent = styled.div`
  width: 100%;
`;

const AllIcon = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.primary};
  background: ${(props) => props.theme.mainBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  color: ${(props) => props.theme.black};
  font-size: 1rem;
  font-weight: 400;
  margin-top: 8px;

  ${media.sm} {
    font-size: 1.375rem;
    margin-top: 16px;
  }
`;

type Props = {
  onClick?: () => void;
};

const AllCard = ({ onClick }: Props) => {
  return (
    <AllCardBg onClick={onClick}>
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
