import styled from "styled-components";
import BG from "@/assets/t29/images/loginBG.png";

export const AuthFormContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 30px 20px 30px;
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
  max-width: 400px;
  margin: 0 auto 20px;
`;

export const LoginTitle = styled.div`
  font-size: 40px;
  white-space: nowrap;
  font-weight: 700;
  line-height: 55px;
  letter-spacing: 0em;
  text-align: center;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.primary};
`;

export const FormContainerWithBG = styled.div`
  height: 100%;
  background: url(${BG}) no-repeat center center;
`;
