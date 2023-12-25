import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const GrayInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border: none;
  background: ${({ theme }) => theme.white};
  overflow: visible;

  ${media.sm} {
    border: 1px solid ${({ theme }) => theme.blueBorder};
  }
`;
