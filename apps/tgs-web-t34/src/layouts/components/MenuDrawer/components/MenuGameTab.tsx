import styled from "styled-components";
import Icon from "@/components/project/Icon";

type Props = {
  imageUrl: string;
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const Wrapper = styled.div`
  flex-shrink: 0;
  width: 60px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 7.5px;
`;

const Text = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) => ($isActive ? theme.white : theme.white)};
  font-size: 0.875rem;
  font-weight: 400;
`;

const MenuGameTab = ({ imageUrl, text, isActive, onClick }: Props) => {
  return (
    <Wrapper onClick={onClick}>
      <Icon iconUrl={imageUrl} width={"24px"} height={"24px"} style={{ marginBottom: "8px" }} />
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default MenuGameTab;
