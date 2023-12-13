import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const PageContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  padding: 21px 22px;
  max-width: calc(1200px + 22px * 2);
  margin: 0 auto;

  & > div {
    margin-bottom: 15px;
  }

  ${media.sm} {
    & > div {
      margin-bottom: 20px;
    }
  }
`;

export const TransferPageContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(1200px + 22px * 2);
  margin: 0 auto;

  & .MuiButton-fullWidth {
    max-width: 242px !important;
    display: block !important;
  }
`;
