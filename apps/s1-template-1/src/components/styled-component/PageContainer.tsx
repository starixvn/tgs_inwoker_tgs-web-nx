import { media } from "@/theme/breakpoints";
import styled from "styled-components";

export const PageContainer = styled.div`
  flex: 1;
  margin: 0 auto;
  padding: ${({ theme }) => theme.gapPage};
  max-width: ${({ theme }) => theme.mainContentWidth};
  border-radius: 1.6rem;
  ${media.sm} {
    padding: 1.2rem;
    background: ${({ theme }) => theme.pageContainerBackground};
  }
`;

export const TransferPageContainer = styled.div`
  padding: ${({ theme }) => theme.gapPage};
  max-width: ${({ theme }) => theme.mainContentWidth};
  flex: 1;
  margin: 0 auto;
  border-radius: 1.6rem;
  ${media.sm} {
    padding: 1.2rem;
     background: ${({ theme }) => theme.pageContainerBackground};
  }

  & .MuiButton-fullWidth {
    ${media.sm} {
      max-width: 242px !important;
      display: block !important;
    }
  }
`;
