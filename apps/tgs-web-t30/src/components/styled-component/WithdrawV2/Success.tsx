import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const SameLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const Container = styled.div`
  padding-top: 50px;
`;
export const ImgSuccess = styled.img`
  display: block;
  width: 100px;
  margin: 16px 0;

  ${media.sm} {
    margin: 16px auto 0;
  }
`;
export const SuccessMessage = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #23507d;
  text-align: center;
  margin-bottom: 16px;
`;
