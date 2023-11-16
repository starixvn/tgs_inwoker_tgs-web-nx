import styled from "styled-components";
import Icon from "@/components/project/Icon";

type Props = {
  imageUrl: string;
  activedIconUrl: string;
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const Wrapper = styled.div<{
  $imageUrl: string;
  $text: string;
  $isActive: boolean;
}>`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 0 30px 30px 0;
  padding: 6px 8px 6px 8px;
  border-radius: 4px;
  gap: 4px;
`;

const Text = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) => ($isActive ? theme.secBTNOutline : theme.white)};
  font-weight: 600;
  line-height: 14.06px;
`;

const MenuGameTab = ({ imageUrl, activedIconUrl, text, isActive, onClick }: Props) => {
  return (
    <Wrapper $isActive={isActive} $imageUrl={imageUrl} $text={text} onClick={onClick}>
      <Icon iconUrl={isActive ? activedIconUrl : imageUrl} width={"24px"} height={"24px"} />
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default MenuGameTab;
