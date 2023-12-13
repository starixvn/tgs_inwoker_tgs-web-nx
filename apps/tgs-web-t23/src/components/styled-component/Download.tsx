import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const DownloadAppContainer = styled.div`
  padding: 0 205px;

  ${media.xs} {
    padding: 0 24px;
  }
`;
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
  font-family: Gill Sans MT;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background: #2e3237;
  padding: 40px 20px;
`;
export const Text = styled.div`
  padding-top: 10px;
  font-family: Gill Sans MT;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const InfoCardListContainer = styled.div`
  padding-top: 10px;
  width: 100%;
  gap: 12px;
  display: flex;
  flex-wrap: wrap;
`;
