import styled from "styled-components";
import React, { useState } from "react";
import { theme } from "@/theme";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHeader } from "@tgs-web-nx/core/features";

type Props = {
  text: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

type IconComponentProps = {
  $color: string;
  isHovered: boolean;
};

const Text = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) => ($isActive ? theme.white : theme.g2)};
  font-size: 15.6px;
  font-weight: 400;
`;

const Wrapper = styled.div<{
  $text: string;
  $isActive: boolean;
  $isShrink: boolean;
  $isHovered: boolean;
}>`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 44.74px;;
  align-self: stretch;
  padding: 0px 24px;
  gap: 24px;
  border-radius: ${({ $isHovered }) => ($isHovered ? "4px" : "0px")};
  background: ${({ $isActive, theme }) => ($isActive ? theme.black : theme.g7)};

  &:hover {
    background:  ${({ theme }) => theme.black};
    ${Text} {
      color: ${({ theme }) => theme.white};
    }
  }
`;

const DesktopAccountMenuItem = ({ text, isActive, onClick, children }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isDesktopSize } = useRwd();
  const { isMenuOpen } = useHeader();
  const isShrink = isDesktopSize && !isMenuOpen;

  const handleHover = () => {
    if (isActive) {
      return;
    } else {
      setIsHovered(true);
    }
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const cloneChildrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && typeof child.type === 'function') {
      const IconComponent = child.type as React.ComponentType<IconComponentProps>;

      return (
        <IconComponent
          $color={(!isActive && isHovered) ? theme.white : (isActive ? theme.white : theme.g2)}
          isHovered={isHovered}
        />
      );
    }
    return child;
  });

  return (
    <Wrapper $isShrink={isShrink} $isActive={isActive} $text={text} onClick={onClick} $isHovered={isHovered}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {cloneChildrenWithProps}
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default DesktopAccountMenuItem;
