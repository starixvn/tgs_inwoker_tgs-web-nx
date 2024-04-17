import styled from "styled-components";
import React, { useState } from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHeader } from "@tgs-web-nx/core/features";
import { theme } from "@/theme";

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
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* color: ${({ $isActive, theme }) => ($isActive ? theme.primary : theme.g2)}; */
  color: ${({ theme }) => theme.grey05};
  background: ${({ theme }) => theme.grey02};
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
  flex-direction: column;
  justify-content: ${({ $isShrink }) => ($isShrink ? "center" : "unset")};
  width: calc((100% - 3 * 12px ) / 3);
  height: 90px;
  background: ${({ theme, $isActive }) => ($isActive ? theme.g7 : theme.mainBackground)};
  align-self: stretch;
  text-align: center;
  &:hover {
    background: ${({ theme }) => theme.g7};
    ${Text} {
      color: ${({ theme, $isActive }) => ($isActive ? theme.primary : theme.white)};
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45px;
  background: ${({ theme }) => theme.grey01};
`;

const AccountMenuItem = ({ text, isActive, onClick, children }: Props) => {
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
    if (React.isValidElement(child) && typeof child.type === "function") {
      const IconComponent = child.type as React.ComponentType<IconComponentProps>;

      return (
        <IconComponent
          $color={theme.grey05}
          // $color={!isActive && isHovered ? theme.white : isActive ? theme.primary : theme.white}
          isHovered={isHovered}
        />
      );
    }
    return child;
  });

  return (
    <Wrapper
      $isShrink={isShrink}
      $isActive={isActive}
      $text={text}
      onClick={onClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <IconWrapper>{cloneChildrenWithProps}</IconWrapper>
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default AccountMenuItem;
