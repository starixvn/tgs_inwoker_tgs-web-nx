import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const SameLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const Container = styled.div``;
export const ImgSuccess = styled.img`
  display: block;
  width: 40px;

  ${media.sm} {
    width: 123px;
  }
`;
export const SuccessMessage = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;
