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
  color: ${({ $isActive, theme }) => ($isActive ? theme.primary : theme.g2)};
  font-size: 15.6px;
  font-weight: 400;
`;

const Wrapper = styled.div<{
  $text: string;
  $isActive: boolean;
  $isShrink: boolean;
}>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: ${({ $isShrink }) => $isShrink ? "center" : "unset"};
  height: 44.74px;;
  background: ${({ theme, $isActive }) =>
    $isActive
      ? theme.g7
      : theme.mainBackground};
  align-self: stretch;
  padding: ${({ $isShrink }) => $isShrink ? "unset" : "10px 20px"};
  gap:  ${({ $isShrink }) => $isShrink ? "unset" : "15px"};

  &:hover {
    background: ${({ theme }) => theme.g7};
    ${Text} {
      color: ${({ theme, $isActive }) =>
    $isActive
      ? theme.primary
      : theme.white};
    }
  }
`;

const MenuGameTab = ({ text, isActive, onClick, children }: Props) => {
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
          $color={(isActive || isHovered) ? theme.primary : theme.white}
          isHovered={isHovered}
        />
      );
    }
    return child;
  });

  return (
    <Wrapper $isShrink={isShrink} $isActive={isActive} $text={text} onClick={onClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {cloneChildrenWithProps}
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default MenuGameTab;
