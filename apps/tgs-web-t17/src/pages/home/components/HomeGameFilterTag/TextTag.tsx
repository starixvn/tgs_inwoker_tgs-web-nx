import React from "react";
import styled from "styled-components";
import { media } from "@/theme/breakpoints";
import { theme } from "@/theme";

const Wrapper = styled.div<{
  $isActive: boolean;
}>`
  vertical-align: middle;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  max-width: none;
  height: 100%;
  box-sizing: border-box;
  user-select: none;
  min-width: 66px;
  padding: 10px;
  cursor: pointer;
  
  ${media.sm} {
    cursor: pointer;
    & :hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const Text = styled.div<{
  $isActive: boolean;
}>`
 color: ${({ theme, $isActive }) =>
    $isActive ? theme.primary : theme.white};
  font-size: 0.875rem;
  font-weight: 400;
`;

type Props = {
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const TextTag = ({ text, isActive, onClick }: Props) => {
  return (
    <Wrapper
      $isActive={isActive}
      onClick={onClick}
    >
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default TextTag;
