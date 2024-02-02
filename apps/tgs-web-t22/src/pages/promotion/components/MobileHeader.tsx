import styled from "styled-components";
import { useHistory } from "react-router-dom"
import iconArrow from "@/assets/t23/images/promotion/icon_arrow.svg";
import { media } from "@/theme/breakpoints";

const Root = styled.div`
  padding: 20px;
  position: relative;
  display: black;
  width: 100vw ;
  text-align: center;
  font-size: 1rem;
  color: #fff;
  background: ${({ theme }) => theme.headerBg} center no-repeat;
  background-size: cover;

  ${media.sm} {
    display: none;
  }
`;

const GoBackButton = styled.button`
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translate(0, -50%);
  width: 20px;
  height: 20px;
  background: url(${iconArrow}) center no-repeat;
  background-size: contain;
  cursor: pointer;
  filter: brightness(100);
  outline: none;
  border: none ;
`;

type Props = {
  title: string;
}

export const MobileHeader = ({
  title
}: Props) => {
  const history = useHistory();

  return (
    <Root>
        {title}
        <GoBackButton onClick={() => history.goBack()} />
    </Root>
  )
}