import { useHomeGameContext } from "@tgs-web-nx/core/features";
import styled from "styled-components";

const Wrapper = styled.div<{
  $isActive: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: none;
  height: 100%;
  user-select: none;
  padding: 4px;
  padding: 8px 14px;
  border-radius: 30px;
  border: ${({ theme, $isActive }) =>
    `2px solid ${$isActive ? theme.lightPurple : theme.secBTNBGC}`};
  gap: 8px;
  flex-shrink: 0;
  &:hover {
    cursor: pointer;
  }
  & > span {
    color: ${({ theme, $isActive }) => ($isActive ? theme.lightPurple : theme.gray50)};
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
      <img src={isActive ? activedUrl : iconUrl} alt={text} />
      <span>{text}</span>
    </Wrapper>
  );
};

export default CommonTag;
