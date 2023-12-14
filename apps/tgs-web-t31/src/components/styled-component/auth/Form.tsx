import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const FormSubContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const RememberMeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  cursor: pointer;
  //margin: 8px 0;
`;
export const ForgotPasswordContainer = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  cursor: pointer;
  text-decoration: underline;
  ${media.sm} {
    color: ${({ theme }) => theme.yellow};
  }
`;
export const RedirectContainer = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  align-items: center;

  .link {
    color: ${({ theme }) => theme.text};
    margin-left: 8px;
    cursor: pointer;
  }
`;
