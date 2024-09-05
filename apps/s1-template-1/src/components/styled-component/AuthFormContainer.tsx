import BG from "@/assets/t29/images/loginBG.png";
import styled from "styled-components";

export const AuthFormContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 22px;
  overflow: auto;

  ::-webkit-scrollbar {
    visibility: hidden;
    width: 0;
  }

  & > * {
    flex-shrink: 0;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  margin: 0 auto 2rem;
`;

export const LoginTitle = styled.div`
  height: 3.6rem;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 24px;
  border-radius: 10px;
  background: linear-gradient(276deg, #b3cd0a 2.32%, #7f9303 99.1%);
`;

export const FormContainerWithBG = styled.div`
  height: 100%;
  background: url(${BG}) no-repeat center center;
`;
