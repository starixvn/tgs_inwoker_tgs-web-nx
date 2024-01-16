import styled from "styled-components";
import android from "@/assets/t27/images/home/android.svg";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const AffiliateProgram = () => {
  return (
    <Wrapper>
      <img src={android} alt="android" />
    </Wrapper>
  );
};

export default AffiliateProgram;
