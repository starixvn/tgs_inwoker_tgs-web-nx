import styled from "styled-components";

export const LimitLabel = styled.span`
  color: ${({ theme }) => theme.black};
`;

export const LimitAmount = styled.span`
  color: ${({ theme }) => theme.black};
`;

export const TransferLabel = styled.div`
  color: ${({ theme }) => theme.black};
`;

export const TransferValue = styled.div`
  color: ${({ theme }) => theme.black};
`;

export const ExchangeRateContainer = styled.div`
  margin-bottom: 24px;
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
  color: ${({ theme }) => theme.text};
  font-size: 0.937rem;
  font-weight: 400;
  margin-top: 9px;
  text-align: center;
  max-width: 500px;
`;

export const FeeSpot = styled.div`
  margin-bottom: 17px;
  span {
    font-weight: bold;
  }
`;
