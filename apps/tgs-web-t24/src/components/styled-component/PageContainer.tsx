import styled from "styled-components";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";

export const PageContainer = styled.div`
  padding: 0 22px;
  max-width: calc(${MAIN_CONTENT_MAX_WIDTH} + 22px * 2);
  margin: auto;
`;

export const TransferPageContainer = styled.div`
  padding: 0 22px;
  max-width: calc(${MAIN_CONTENT_MAX_WIDTH} + 22px * 2);
  margin: auto;

  & .MuiButton-fullWidth {
    max-width: 242px !important;
    display: block !important;
    margin: auto !important;
  }
`;
