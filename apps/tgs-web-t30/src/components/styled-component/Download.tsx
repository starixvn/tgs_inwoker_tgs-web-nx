import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const DownloadAppContainer = styled.div``;
export const GirlImage = styled.div`
  width: 100%;
  margin-bottom: 10px;

  img {
    width: 100%;
  }
`;
export const Paper = styled.div`
  padding: 0;
  background: ${({ theme }) => theme.mainBackground};

  ${media.sm} {
    padding: 10px;
  }
`;
export const IntroductionContainer = styled.div`
  color: ${({ theme }) => theme.white};
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 1.318rem;
  margin-bottom: 10px;
`;
export const InfoCardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;
