import React from "react";
import config from "@tgs-web-nx/config";
import DynamicFont from "react-dynamic-font";
import { styled as muiStyled } from "@mui/material/styles";
import { Common, i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import { useGameStore } from "@tgs-web-nx/core";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import { Button } from "@/components/UI/Button";

const TransferContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

const GameTransferWallet = styled.div`
  display: flex;
  justify-content: space-between;
  width: 340px;
  border-radius: 4px;
  background: ${({ theme }) => theme.black60};
  padding: 20px 12px;
`;
const GameTransferLeftWrap = styled.div`
  max-width: 70px;
`;

const GameTransferRighttWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 66px;
  height: 34px;
  object-fit: cover;
`;
const GameName = styled.div`
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: center;
  color: ${({ theme }) => theme.text};
  margin-top: 7px;
`;
const GameWalletAmount = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  color: ${({ theme }) => theme.text};
  text-align: right;
  display: inline-block;
  margin-top: 3px;
`;

const TransferButton = muiStyled(Button)(({ theme }) => ({
  width: "140px",
  borderRadius: "4px",
  fontSize: "12px",
  fontWeight: "400",
  lineHeight: "14px",
  textAlign: "center",
  padding: "10px 12px",
  background: "transparent",
  border: `1px solid ${theme.palette.accountLableText}`,
  marginBottom: "14px",
  "&:hover": {
    background: theme.palette.priBTNOutline,
  },
}));

type Props = {
  handleTransferIn: (gpcode: string) => void;
};

const TransferCards = ({ handleTransferIn }: Props) => {
  const { providerList } = useUserWalletInfoContext();

  const switchAlternateLogo = (condition: boolean) => {
    if (condition) {
      return "alternate/";
    } else {
      return "";
    }
  };

  return (
    <TransferContainer>
      {providerList
        .filter((provider) => provider.status === 0 && provider.transferwallet)
        .filter((provider) => {
          if (config.features.MergeEVORTNT) {
            return (
              provider.gpcode !== "NTTF" &&
              provider.gpcode !== "RTTF" &&
              provider.gpcode !== "BTG" &&
              provider.gpcode !== "NLC"
            );
          }
        })
        .map((provider, index) => {
          const displayLogo = () => {
            if (provider.gpcode.toLowerCase() === "evotf" && config.features.MergeEVORTNT) {
              return "evontrt";
            } else {
              return provider.abbreviation.toLowerCase();
            }
          };

          return (
            <GameTransferWallet key={index}>
              <GameTransferLeftWrap>
                <Logo
                  src={`/assets/images/provider/dark/${switchAlternateLogo(
                    //@ts-ignore
                    (config.features.UseAlternateLogo as boolean) || false,
                  )}${displayLogo()}.png`}
                  alt={displayLogo()}
                />
                <GameName>
                  <DynamicFont content={provider.name} />
                </GameName>
              </GameTransferLeftWrap>
              <GameTransferRighttWrap>
                <TransferButton
                  disabled={provider.maintenance === 1}
                  onClick={() => handleTransferIn(provider.gpcode)}
                >
                  {i18n.t("transfer.oneKeyTransferIn").toLocaleUpperCase()}
                </TransferButton>
                <GameWalletAmount>
                  {provider.maintenance === 1
                    ? i18n.t("transfer.maintenance")
                    : "$" + Common.formatNumberWithCommas(provider.balance)}
                </GameWalletAmount>
              </GameTransferRighttWrap>
            </GameTransferWallet>
          );
        })}
    </TransferContainer>
  );
};

export default TransferCards;
