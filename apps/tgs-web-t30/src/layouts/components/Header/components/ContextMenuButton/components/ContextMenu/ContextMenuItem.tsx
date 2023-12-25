import styled from "styled-components";

const ContextMenuItemContainer = styled.div`
  width: 200px;
  height: 40px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.text};
  padding: 10px 12px;
  gap: 10px;
  display: flex;
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
`;

type ContextMenuItemProps = {
  iconUrl: string;
  label: string;
  onClick?: () => void;
};

const ContextMenuItem = ({ label, iconUrl, onClick }: ContextMenuItemProps) => {
  return (
    <ContextMenuItemContainer onClick={onClick}>
      <IconContainer>
        <img src={iconUrl} alt={label} />
      </IconContainer>
      {label}
    </ContextMenuItemContainer>
  );
};

export default ContextMenuItem;
