import styled from "styled-components";
import Icon from "@/components/project/Icon";
import iconArrow from "@/assets/t32/images/menuDrawer/icon-arrow.svg";

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
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.primary};
  padding: 10px 12px;
  gap: 30px;
`;

const Text = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) => ($isActive ? theme.white : theme.white)};
  font-size: 0.975rem;
  font-weight: 400;
`;

const SideNavItem = ({ imageUrl, text, isActive, onClick }: Props) => {
  return (
    <Wrapper $isActive={isActive} $imageUrl={imageUrl} $text={text} onClick={onClick}>
      <Icon iconUrl={imageUrl} width={"30px"} height={"30px"} style={{ marginRight: "10px" }} />
      <Text $isActive={isActive}>{text}</Text>
      <Icon iconUrl={iconArrow} width={"20px"} height={"20px"} style={{ marginLeft: "auto" }} />
    </Wrapper>
  );
};

export default SideNavItem;
