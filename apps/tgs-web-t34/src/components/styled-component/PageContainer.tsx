import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const PageContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.black};
  padding: 20px;
  max-width: calc(1200px + 22px * 2);
  flex: 1;
  margin: 0 auto;
`;

export const TransferPageContainer = styled.div`
  padding: 20px;
  max-width: calc(1200px + 22px * 2);
  flex: 1;
  margin: 0 auto;

  ${media.sm} {
    & .MuiButton-fullWidth {
      max-width: 217px !important;
      display: block !important;
    }
  }
`;
