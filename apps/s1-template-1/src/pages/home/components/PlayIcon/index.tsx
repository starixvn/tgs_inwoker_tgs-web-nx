import styled from "styled-components";

const PlayButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.playButtonBackground};
  border-bottom: 0.2rem solid ${({ theme }) => theme.playButtonBottomBorderColor};
  box-shadow: ${({ theme }) => theme.playButtonShadow};
  border-radius: 50%;
  width: 4.8rem;
  height: 4.8rem;
  over-flow: auto;
  transition: all 0.2s ease-in;

  &:hover {
    border-bottom-width: 0.4rem;
    transition: all 0.3s ease-in;
    box-shadow: ${({ theme }) => theme.playButtonShadowHover};
  }
`;

const PlayIcon = () => {
  return (
    <PlayButton>
      <img src="/assets/images/common/icon-play.svg" width={13} height={18} alt="Icon Play" />
    </PlayButton>
  );
};

export default PlayIcon;
