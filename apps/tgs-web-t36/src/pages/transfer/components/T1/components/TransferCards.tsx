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
  gap: 13px;
`;

const GameTransferWallet = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(20% - 13px);
  border-radius: 3px;
  padding: 10px 20px 10px 10px;
  border: 1px solid #4d8ab9;
`;

const GameTransferLeftWrap = styled.div`
  max-width: 66px;
`;

const GameTransferRighttWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Logo = styled.img`
  width: 66px;
  height: 34px;
  object-fit: contain;
`;

const GameName = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  color: ${({ theme }) => theme.primary};
  margin-top: 10px;
`;

const GameWalletAmount = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: left;
  color: ${({ theme }) => theme.primary};
  text-align: center;
  display: inline-block;
  margin-top: 9px;
`;

const TransferButton = muiStyled(Button)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "400",
  lineHeight: "14px",
  textAlign: "center",
  borderRadius: "6px",
  padding: "5px 10px",
  color: theme.palette.white,
  background: theme.palette.primaryGradient,
  "&:hover": {
    background: "#526E1F",
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
                  {i18n.t("transfer.oneKeyTransferIn")}
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
