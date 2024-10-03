import { media } from "@/theme/breakpoints";
import styled from "styled-components";

export const PageContainer = styled.div`
  flex: 1;
  margin: 0 auto;
  padding: ${({ theme }) => theme.gapPage};
  max-width: ${({ theme }) => theme.mainContentWidth};
`;

export const TransferPageContainer = styled.div`
  padding: ${({ theme }) => theme.gapPage};
  max-width: ${({ theme }) => theme.mainContentWidth};
  flex: 1;
  margin: 0 auto;

  & .MuiButton-fullWidth {
    ${media.sm} {
      max-width: 242px !important;
      display: block !important;
    }
  }
`;
