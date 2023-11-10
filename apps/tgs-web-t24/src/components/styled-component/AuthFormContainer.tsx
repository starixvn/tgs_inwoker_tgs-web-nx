import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const AuthFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;

  ${media.sm} {
    padding: 42px 42px;
  }
`;
