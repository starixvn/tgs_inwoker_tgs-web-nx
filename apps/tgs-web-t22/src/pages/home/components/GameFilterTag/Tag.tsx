import {ReactNode} from "react";
import styled from "styled-components";
import { media } from "@/theme/breakpoints";

const Wrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  ${media.sm} {
    cursor: pointer;
    & :hover {
      color: ${({ theme }) => theme.white};
    }
  }
`;


type Props = {
  children: ReactNode;
  onClick: () => void;
};

const Tag = ({ children, onClick }: Props) => {
  return (
    <Wrapper onClick={onClick}>
      {children}
    </Wrapper>
  );
};

export default Tag;
