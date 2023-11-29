import { useHomeGameContext } from "@tgs-web-nx/core/features";
import styled from "styled-components";

const Wrapper = styled.div<{
  $isActive: boolean;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 60px;
  max-width: none;
  box-sizing: border-box;
  user-select: none;
  background-color: ${({ theme, $isActive }) => ($isActive ? theme.white : "none")};
  padding: 4px;
  border-bottom: ${({ theme, $isActive }) => ($isActive ? `3px solid ${theme.blue60}` : "none")};
  
  & > img {
    width: 100px;
    &:hover {
      cursor: pointer;
    }
  }
`;

type Props = {
  text: string;
  gpCode?: string;
  isActive: boolean;
  onClick: () => void;
};

const ProviderTag = ({ text, gpCode, isActive, onClick }: Props) => {
  const { activeGameTypeKey } = useHomeGameContext();
  if (text !== "All") {
    return (
      <Wrapper $isActive={isActive}>
        <img
          onClick={onClick}
          src={`${
            import.meta.env.BASE_URL
          }assets/images/home/provider_logo/${activeGameTypeKey}/${gpCode}.png`}
          alt={text}
        />
      </Wrapper>
    );
  }
};

export default ProviderTag;
