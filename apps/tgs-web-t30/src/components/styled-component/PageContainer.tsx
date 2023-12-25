import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const PageContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  padding: 12px;
  max-width: calc(1072px + 22px * 2);
  flex: 1;
  margin: 0 auto;

  ${media.sm} {
    background: none;
    padding: 20px 10px;
  }
`;

export const PromotionPageContainer = styled.div`
  background: ${({ theme }) => theme.mainLightBackground};
  max-width: calc(1072px + 22px * 2);
  flex: 1;
  margin: auto;
  padding-bottom: 20px;

  ${media.sm} {
    background: none;
    padding: 20px 10px;
  }
`;

export const TransferPageContainer = styled.div`
  padding: 12px;
  max-width: calc(1072px + 22px * 2);
  flex: 1;
  margin: 0 auto;

  & .MuiButton-fullWidth {
    ${media.sm} {
      max-width: 242px !important;
      display: block !important;
    }
  }
`;
