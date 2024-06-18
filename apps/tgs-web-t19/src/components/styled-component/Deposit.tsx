import styled from "styled-components";
import { media } from "@/theme/breakpoints";

export const LimitLabel = styled.span`
  color: ${({ theme }) => theme.white};
`;

export const LimitAmount = styled.span`
  color: ${({ theme }) => theme.white};
`;

export const TransferLabel = styled.div`
color: ${({ theme }) => theme.white}; 
`;

export const TransferValue = styled.div`
  color: ${({ theme }) => theme.white}; 
`;

export const ExchangeRateContainer = styled.div`
  font-size: 0.937rem;
  font-weight: 400;
`;

export const QRCodeImg = styled.img`
  display: block;
  margin-top: 10px;
  width: 200px;
  height: 200px;
`;

export const HintText = styled.div`
  color: ${({ theme }) => theme.primary};
`;

export const AmountHint = styled.div`
  display: none;

  ${media.sm} {
    display: block;
    color: ${({ theme }) => theme.white};
    font-size: 0.937rem;
    font-weight: 400;
    text-align: center;
    width: 100%;
    position: relative;
    margin-left: 12px;
  }
`;

export const TransferHintAmount = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 0.937rem;
  font-weight: 400;

  ${media.sm} {
  display: none;
  }
`;

export const FeeSpot: React.FC = styled.div`
  margin-left: 20px;
  color: ${({ theme }) => theme.text};

  span {
    font-weight: bold;
  }
`;
