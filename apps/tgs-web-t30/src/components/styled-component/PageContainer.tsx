import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const PageContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  padding: 22px;
  max-width: calc(961px + 22px * 2);
  flex: 1;
  margin: auto;
  overflow: visible;
`;

export const PromotionPageContainer = styled.div`
  background: ${({ theme }) => theme.mainLightBackground};
  max-width: calc(961px + 22px * 2);
  flex: 1;
  margin: auto;
  padding-bottom: 20px;

  ${media.sm} {
    background: none;
    padding: 20px 10px;
  }
`;

export const TransferPageContainer = styled.div`
  padding: 22px;
  max-width: calc(961px + 22px * 2);
  flex: 1;
  margin: auto;

  & .MuiButton-fullWidth {
    max-width: 242px !important;
    display: block !important;
    margin: auto !important;
  }
`;
