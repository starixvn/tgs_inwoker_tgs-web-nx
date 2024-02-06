import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const AuthFormContainer = styled.div`
  width: 100%;
  /* height: 100%; */
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding: 40px;
  overflow: auto;
  gap: 24px;

  ${media.sm} {
    height: 100%;
  }

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
  display: flex;
  flex-direction: column;
`;

export const LoginTitle = styled.div`
  font-size: 22px;
  font-weight: 860;
  color: ${({ theme }) => theme.white};
  white-space: nowrap;

  ${media.sm} {
    font-size: 50px;
    font-weight: 400;
  }
`;
