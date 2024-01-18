import styled from "styled-components";
import BG from "@/assets/t22/images/loginBG.png";
import { media } from "@/theme/breakpoints";

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

  ${media.sm}{
    padding: 70px 20px 30px;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto 20px;
`;

export const LoginTitle = styled.p`
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 36px;
  color: ${({ theme }) => theme.white};
`;

export const FormWrapper = styled.div`
  margin: 45px 20px 0;
  background: ${({ theme }) => theme.lightBlack};
  border-radius: 20px;
`;

export const RedirectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FormContainerWithBG = styled.div`
  height: 100%;
  background: url(${BG}) no-repeat center center;
  background-size: cover;
`;
