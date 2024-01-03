import styled from "styled-components";
import React, { useState } from "react";
import { theme } from "@/theme";

type Props = {
  imageUrl: string;
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
  $imageUrl: string;
  $text: string;
  $isActive: boolean;
}>`
  cursor: pointer;
  display: flex;
  align-items: center;
  background: ${({ theme, $isActive }) =>
    $isActive
      ? theme.g7
      : theme.mainBackground};

  align-self: stretch;
  padding: 0px 24px;
  height: 44.74px;
  gap: 24px;
  border: 1px solid red;

  &:hover {
    background: ${({ theme }) => theme.g7};
    ${Text} {
      color: ${({ theme }) => theme.white};
    }
  }
`;

const MenuGameTab = ({ imageUrl, text, isActive, onClick, children }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const cloneChildrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && typeof child.type === 'function') {
      const IconComponent = child.type as React.ComponentType<IconComponentProps>;

      return (
        <IconComponent
          $color={(isActive || isHovered) ? theme.white : (isActive ? theme.primary : theme.g2)}
          isHovered={isHovered}
        />
      );
    }
    return child;
  });


  return (
    <Wrapper $isActive={isActive} $imageUrl={imageUrl} $text={text} onClick={onClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {cloneChildrenWithProps}
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default MenuGameTab;
