import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const AuthFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding:20px 12px;
  ${media.sm} {
    padding: 42px 42px;
  }
`;
