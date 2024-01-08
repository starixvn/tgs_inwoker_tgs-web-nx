import { useHomeGameContext } from "@tgs-web-nx/core/features";
import styled from "styled-components";

const Wrapper = styled.div<{
  $isActive: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: none;
  height: 36px;
  user-select: none;
  padding: 10px 24px;
  gap: 10px;
  color: ${({ theme, $isActive }) => ($isActive ? theme.primary : theme.text)};
  text-transform: capitalize;
  &:hover {
    cursor: pointer;
  }
`;

type Props = {
  text: string;
  isActive: boolean;
  iconUrl?: string;
  activedUrl?: string;
  onClick: () => void;
};

const CommonTag = ({ text, isActive, iconUrl, activedUrl, onClick }: Props) => {
  return (
    <Wrapper $isActive={isActive} onClick={onClick}>
      {text}
    </Wrapper>
  );
};

export default CommonTag;
