import styled from "styled-components";
import Icon from "@/components/project/Icon";

type Props = {
  imageUrl: string;
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const Wrapper = styled.div<{
  $imageUrl: string;
  $text: string;
  $isActive: boolean;
}>`
  width: 247px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: ${({ theme, $isActive }) => ($isActive ? theme.gray30 : "transparent")};
  padding: 12px 46px;
  border-radius: 0 30px 30px 0;
`;

const Text = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) => ($isActive ? theme.white : theme.white)};
  font-size: 1.25rem;
  font-weight: 400;
`;

const MenuGameTab = ({ imageUrl, text, isActive, onClick }: Props) => {
  return (
    <Wrapper $isActive={isActive} $imageUrl={imageUrl} $text={text} onClick={onClick}>
      <Icon iconUrl={imageUrl} width={"30px"} height={"30px"} style={{ marginRight: "10px" }} />
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default MenuGameTab;
