import styled from "styled-components";
import React from "react";

const ContextMenuItemContainer = styled.div`
  width: 264px;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  color: ${({ theme }) => theme.gray60};
  padding: 10px 34px;
  gap: 10px;
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
`;

type ContextMenuItemProps = {
  iconUrl: string;
  label: string;
} & React.HTMLProps<HTMLDivElement>;

const ContextMenuItem = ({ label, iconUrl, ...others }: ContextMenuItemProps) => {
  return (
    //@ts-ignore
    <ContextMenuItemContainer {...others}>
      <IconContainer>
        <img src={iconUrl} alt={label} />
      </IconContainer>
      {label}
    </ContextMenuItemContainer>
  );
};

export default ContextMenuItem;
