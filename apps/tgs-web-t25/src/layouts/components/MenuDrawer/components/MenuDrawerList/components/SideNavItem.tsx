import styled from "styled-components";
import Icon from "@/components/project/Icon";
import { theme } from "@/theme";

type Props = {
  imageUrl: string;
  text: string;
  isActive: boolean;
  isShrink: boolean;
  onClick: () => void;
};

type WrapperProps = {
  $imageUrl: string;
  $text: string;
  $isActive: boolean;
  $isShrink: boolean;
  theme: typeof theme;
};

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: ${({ theme, $isShrink }: WrapperProps) =>
    $isShrink ? "transparent" : theme.black02};
  padding: 9.87px 10px;
`;

const Text = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) => ($isActive ? theme.white : theme.white)};
  font-size: 0.975rem;
  font-weight: 400;
  white-space: nowrap;
`;

const SideNavItem = ({ imageUrl, text, isActive, onClick, isShrink }: Props) => {
  return (
    <Wrapper
      $isActive={isActive}
      $imageUrl={imageUrl}
      $text={text}
      $isShrink={isShrink}
      onClick={onClick}
    >
      <Icon iconUrl={imageUrl} width={"30px"} height={"30px"} style={{ marginRight: "10px" }} />
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default SideNavItem;
