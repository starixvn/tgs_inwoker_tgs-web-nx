import React from "react";
import styled from "styled-components";
import { media } from "@/theme/breakpoints";
import { theme } from "@/theme";
import iconCheck from "@/assets/t34/images/deposit/icon-check.svg";
import Icon from "@/components/project/Icon";

type BadgeContainerProps = {
  $isActive: boolean;
  theme: typeof theme;
};
const BadgeContainer = styled.div<BadgeContainerProps>`
  position: relative;
  width: calc((100% - 6px * 3) / 4);
  height: fit-content;
  cursor: pointer;
  padding: 13px;
  text-align: center;
  color: ${({ theme }) => theme.maskBlack50};
  border: 1px solid
    ${({ $isActive, theme }: BadgeContainerProps) => ($isActive ? theme.red : theme.maskBlack50)};

  font-size: 0.75rem;
  font-weight: 400;
  border-radius: 2px;

  ${media.md} {
    width: auto;
  }
`;

type Props = {
  text: string;
  isActive: boolean;
  handleClick: () => void;
};

const Badge = ({ text, handleClick, isActive }: Props) => {
  return (
    <BadgeContainer onClick={handleClick} $isActive={isActive}>
      {text}

      {isActive && (
        <Icon
          iconUrl={iconCheck}
          width={"20px"}
          height={"20px"}
          style={{
            position: "absolute",
            bottom: "-1px",
            right: "0px",
          }}
        />
      )}
    </BadgeContainer>
  );
};

export default Badge;
