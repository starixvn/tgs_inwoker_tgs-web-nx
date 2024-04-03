import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const DownloadAppContainer = styled.div``;
export const GirlImage = styled.div`
  width: 100%;
  margin-bottom: 10px;
  border-radius: 10px;

  img {
    width: 100%;
  }
`;

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  padding: 10px;
`;

export const IntroductionContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => "#23507D"};
  font-family: Arial;
  padding: 0px;
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  gap: 12px;
  margin-bottom: 12px;
  border-radius: 10px;

  & span {
    font-size: 18px;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: 0em;
  }
  & p {
    color: "#44515C";
    font-size: 14px;
    font-weight: 400;
    line-height: 16.41px;
  }

  ${media.sm} {
    padding: 40px 20px;
  }
`;
export const InfoCardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;

  ${media.sm} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;
