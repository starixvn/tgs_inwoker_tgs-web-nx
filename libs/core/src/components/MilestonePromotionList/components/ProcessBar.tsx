import styled from "styled-components";
import processBG from "libs/core/static/images/promotion/processBarBG.png";
import turnoverBarImg from "libs/core/static/images/promotion/turnoverBar.png";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const ProcessBarWrapper = styled.div`
  width: 100%;
`;

export const ProcessBarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  & img {
    position: absolute;
    left: 0;
    top: 60%;
    width: 32px;
    height: 32px;
    z-index: 2;
  }
`;

export const ProcessBar = styled.div`
  position: absolute;
  width: 100%;
  height: 12px;
  background: url(${processBG});
`;

export const TotalBar = styled.div`
  width: 100%;
  height: 12px;
  background: white;
  border-radius: 20px;
`;

export const CompleteBar = styled.div<{ $width: number }>`
  position: absolute;
  height: 12px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  max-width: 100%;
  width: ${({ $width }) => `${($width * 100).toFixed(2)}%`};
  background-image: url(${turnoverBarImg});
`;

const MilestoneProcessBar = ({ total, current }: { total: number; current: number }) => {
  return (
    <ProcessBarWrapper>
      <ProcessBarContainer>
        <Wrapper>
          <ProcessBar>
            <CompleteBar $width={current / total} />
          </ProcessBar>
          <TotalBar />
        </Wrapper>
      </ProcessBarContainer>
    </ProcessBarWrapper>
  );
};

export default MilestoneProcessBar;
