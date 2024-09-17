import { media } from "@/theme/breakpoints";
import styled from "styled-components";

export const PageContainer = styled.div`
  /* max-width: calc(961px + 20px * 2); */
  flex: 1;
  margin: 0 auto;
   padding: ${({ theme }) => theme.gapPage};

  ${media.sm} {
    padding: 10px;
    background: ${({ theme }) => theme.blue20};
  }
`;

export const TransferPageContainer = styled.div`
  padding: ${({ theme }) => theme.gapPage};
  max-width: 1170px;
  flex: 1;
  margin: 0 auto;

  ${media.sm} {
    padding: 10px;
    background: ${({ theme }) => theme.blue20};
  }

  & .MuiButton-fullWidth {
    ${media.sm} {
      max-width: 242px !important;
      display: block !important;
    }
  }
`;

export const DownloadPageContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  padding: 12px;
  /* max-width: calc(961px + 20px * 2); */
  flex: 1;
  margin: 0 auto;

  ${media.sm} {
    padding: 10px;
    background: ${({ theme }) => theme.blue20};
  }
`;
