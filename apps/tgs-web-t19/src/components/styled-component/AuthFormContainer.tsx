import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const AuthFormContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding: 40px;
  overflow: auto;
  gap: 24px;

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
  
  ${media.sm} {
    min-height: 494px;
  }
`;

export const LoginTitle = styled.div`
  font-size: 50px;
  white-space: nowrap;
  font-weight: 400;
  color: ${({ theme }) => theme.white};
`;
