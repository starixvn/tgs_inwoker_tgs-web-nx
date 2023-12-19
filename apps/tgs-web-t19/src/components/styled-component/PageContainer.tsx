import styled from "styled-components";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";

export const PageContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  max-width: calc(961px + 20px * 2);
  flex: 1;
  margin: 0 auto;

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
  }
`;

export const TransferPageContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  padding: 20px;
  max-width: calc(961px + 20px * 2);
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
  max-width: calc(961px + 20px * 2);
  flex: 1;
  margin: 0 auto;

  ${media.sm} {
    padding: 10px;
    background: ${({ theme }) => theme.blue20};
  }
`;
