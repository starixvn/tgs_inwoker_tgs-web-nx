import styled from "styled-components";
import Icon from "@/components/project/Icon";

type Props = {
  imageUrl: string;
  text: string;
  onClick: () => void;
};

const Wrapper = styled.div<{
  $imageUrl: string;
  $text: string;
}>`
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 9.87px 10px;
  border-bottom: ${({ theme }) => `1px solid ${theme.black30}`};
`;

const Text = styled.div`
  color: ${({ theme }) => theme.iconLable};
  font-size: 0.975rem;
  font-weight: 400;
`;

const SideNavItem = ({ imageUrl, text, onClick }: Props) => {
  return (
    <Wrapper $imageUrl={imageUrl} $text={text} onClick={onClick}>
      <Icon iconUrl={imageUrl} width={"30px"} height={"30px"} style={{ marginRight: "10px" }} />
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default SideNavItem;
