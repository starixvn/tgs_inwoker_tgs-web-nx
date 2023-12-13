import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const PageContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  padding: 20px;
  max-width: calc(961px + 20px * 2);
  flex: 1;
  margin: 0 auto;
`;

export const TransferPageContainer = styled.div`
  padding: 20px 16px;
  max-width: calc(961px + 20px * 2);
  flex: 1;
  margin: 0 auto;

  ${media.sm} {
    & .MuiButton-fullWidth {
      max-width: 250px !important;
      display: block !important;
    }
  }
`;
