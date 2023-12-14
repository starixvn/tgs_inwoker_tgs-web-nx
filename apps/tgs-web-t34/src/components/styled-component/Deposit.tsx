import styled from "styled-components";

export const LimitLabel = styled.span`
  color: ${({ theme }) => theme.black};
`;

export const LimitAmount = styled.span`
  color: ${({ theme }) => theme.black};
`;

export const TransferLabel = styled.div``;
export const TransferValue = styled.div``;

export const ExchangeRateContainer = styled.div`
  margin: 20px auto;
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
  color: ${({ theme }) => theme.maskBlack50};
  font-size: 0.937rem;
  font-weight: 400;
  margin-top: 9px;
  max-width: 500px;
`;

export const FeeSpot = styled.div`
  span {
    font-weight: bold;
  }
`;
