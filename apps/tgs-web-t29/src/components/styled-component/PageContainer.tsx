import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const PageContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  padding: 20px;
  max-width: calc(961px + 20px * 2);
  flex: 1;
  margin: 0 auto;

  ${media.sm} {
    padding: 10px;
    background: ${({ theme }) => theme.blue20};
  }
`;

export const TransferPageContainer = styled.div`
  background: ${({ theme }) => theme.blue20};
  padding: 20px;
  max-width: calc(961px + 20px * 2);
  flex: 1;
  margin: 0 auto;
  background: gold;

  ${media.sm} {
    padding: 10px;
    background: ${({ theme }) => theme.blue20};
  }

  & .MuiButton-fullWidth {
    max-width: 242px !important;
    display: block !important;
    margin: auto !important;
  }
`;
