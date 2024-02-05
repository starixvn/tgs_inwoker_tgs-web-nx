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
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Text = styled.div<{ $isActive: boolean }>`
  color: ${({ theme }) => theme.text};
  font-size: 0.975rem;
  font-weight: 400;
`;

const SideNavItem = ({ imageUrl, text, isActive, onClick }: Props) => {
  return (
    <Wrapper $isActive={isActive} $imageUrl={imageUrl} $text={text} onClick={onClick}>
      <Icon iconUrl={imageUrl} width={"30px"} height={"30px"} style={{ marginRight: "10px" }} />
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default SideNavItem;
