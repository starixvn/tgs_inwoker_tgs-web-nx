import styled from "styled-components";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

export const PageContainer = styled.div`
  background: ${({ theme }) => theme.pureBlack};
  padding: 20px;
  /* max-width: calc(961px + 20px * 2); */
  flex: 1;
  margin: 0 auto;

  ${media.sm} {
    /* max-width: ${SUB_CONTENT_MAX_WIDTH}; */
    margin: 0 auto;
    padding: 40px 16px 16px 16px;
    border-radius: 0 10px 10px 0;
  }
`;

export const TransferPageContainer = styled.div`
  background: ${({ theme }) => theme.pureBlack};
  padding: 20px;
  max-width: calc(961px + 20px * 2);
  flex: 1;
  margin: 0 auto;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    padding: 40px 16px 16px 16px;
    border-radius: 0 10px 10px 0;
  }

  & .MuiButton-fullWidth {
    ${media.sm} {
      max-width: 242px !important;
      display: block !important;
    }
  }
`;

export const DownloadPageContainer = styled.div`
  background: ${({ theme }) => theme.pureBlack};
  padding: 20px;
  max-width: calc(961px + 20px * 2);
  flex: 1;
  margin: 0 auto;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    padding: 40px 16px 16px 16px;
    border-radius: 0 10px 10px 0;
  }

  & .MuiButton-fullWidth {
    ${media.sm} {
      max-width: 242px !important;
      display: block !important;
    }
  }
`;
