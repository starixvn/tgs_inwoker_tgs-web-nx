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
      <img src={isActive ? activedUrl : iconUrl} alt={text} />
    </Wrapper>
  );
};

export default CommonTag;
