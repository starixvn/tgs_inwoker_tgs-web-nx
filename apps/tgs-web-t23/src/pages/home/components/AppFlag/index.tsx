import styled from "styled-components";
import { useHistory } from "react-router-dom";
import android from "@/assets/t23/images/home/android.svg";
import ios from "@/assets/t23/images/home/ios.svg";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 19px;
`;

const AppFlag = () => {
  const history = useHistory();
  const handleClickpPatform = () => {
    history.push("/download");
  };
  return (
    <Wrapper>
      <img
        onClick={() => {
          handleClickpPatform();
        }}
        src={android}
        alt="android"
      />
      <img
        onClick={() => {
          handleClickpPatform();
        }}
        src={ios}
        alt="ios"
      />
    </Wrapper>
  );
};

export default AppFlag;
