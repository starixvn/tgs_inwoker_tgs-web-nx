import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const GrayInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.grey10};
  overflow: visible;
  ${media.sm} {
    border-bottom: unset;
    border: 1px solid ${({ theme }) => theme.grey10};
  }
`;
