import styled from "styled-components";

export const PlayButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.playButtonBackground};
  border-radius: 50%;
  width: 7rem;
  height: 7rem;

  &:hover {
    cursor: pointer;
  }
`;

const PlayIcon = () => {
  return (
    <PlayButton>
      <img src="/assets/images/common/icon-play.svg" width={18} height={24} alt="Icon Play" />
    </PlayButton>
  );
};

export default PlayIcon;
