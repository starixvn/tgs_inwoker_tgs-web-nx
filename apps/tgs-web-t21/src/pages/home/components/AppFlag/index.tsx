import styled from "styled-components";
import android from "@/assets/t21/images/home/android.svg";
import ios from "@/assets/t21/images/home/ios.svg";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const AppFlag = () => {
  return (
    <Wrapper>
      <img src={android} alt="android" />
      <img src={ios} alt="ios" />
    </Wrapper>
  );
};

export default AppFlag;
