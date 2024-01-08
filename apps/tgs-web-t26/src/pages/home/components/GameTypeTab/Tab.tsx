import styled from "styled-components";
import { theme } from "@/theme";

type IconProps = {
  $color: string;
};

type Props = {
  text: string;
  fontSize: "small" | "smaller" | string;
  isActive: boolean;
  Icon: React.FC<IconProps>;
  onClick: () => void;
};

const Wrapper = styled.div<{
  $text: string;
  $isActive: boolean;
}>`
  flex-shrink: 0;
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 77px;
  height: 68px;
  padding: 4px;
  gap: 6px;
  user-select: none;
  border-radius: 6px;
`;

const Text = styled.div<{ $fontSize: string; $isActive: boolean }>`
  color: ${({ theme, $isActive }) => ($isActive ? theme.secondary : theme.text)};
  font-size: 14px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
`;

const Tab = ({ text, isActive, fontSize, Icon, onClick }: Props) => {
  return (
    <Wrapper $isActive={isActive} $text={text} onClick={onClick}>
      <Icon $color={isActive ? theme.secondary : theme.white} />
      <Text $fontSize={fontSize} $isActive={isActive}>
        {text}
      </Text>
    </Wrapper>
  );
};

export default Tab;
