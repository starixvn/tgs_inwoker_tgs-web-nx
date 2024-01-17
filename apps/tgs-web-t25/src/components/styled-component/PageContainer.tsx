import styled from "styled-components";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH, SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

export const PageContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  padding: 0 20px 20px;
  max-width: calc(${SUB_CONTENT_MAX_WIDTH} + 20px * 2);
  flex: 1;
  margin: 0 auto;

  ${media.sm} {
    padding: 40px;
    background: ${({ theme }) => theme.black02};
  }
`;

export const TransferPageContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  padding: 0 20px 20px;
  max-width: calc(${SUB_CONTENT_MAX_WIDTH} + 20px * 2);
  flex: 1;
  margin: 0 auto;

  ${media.sm} {
    padding: 40px;
    background: ${({ theme }) => theme.black02};
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
  max-width: calc(${SUB_CONTENT_MAX_WIDTH} + 20px * 2);
  flex: 1;
  margin: 0 auto;

  ${media.sm} {
    padding: 40px;
    background: ${({ theme }) => theme.black02};
  }
`;
