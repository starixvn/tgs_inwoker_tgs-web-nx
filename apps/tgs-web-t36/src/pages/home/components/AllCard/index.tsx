import styled from "styled-components";
import dots from "@/assets/t36/images/home/dots.svg";
import { media } from "@/theme/breakpoints";

const AllCardBg = styled.div`
  width: calc(40% - 10px);
  position: relative;
  cursor: pointer;
  aspect-ratio: 148 / 194;

  ${media.sm} {
    width: calc(12.19% - 14px);
    min-width: 148px;
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
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.g2};
  background: ${(props) => props.theme.mainBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  color: ${(props) => props.theme.white};
  font-size: 1rem;
  font-weight: 400;
  margin-top: 16px;

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
