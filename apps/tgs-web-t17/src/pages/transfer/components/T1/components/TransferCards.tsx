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
  width: 346px;
  border-radius: 10px;
  background: ${({ theme }) => theme.mainBackground};
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
  width: 82px;
  height: 43px;
  object-fit: cover;
`;

const GameName = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  color: ${({ theme }) => theme.white};
  margin-top: 10px;
`;

const GameWalletAmount = styled.div`
  font-size: 1.5625rem;
  font-weight: 400;
  text-align: left;
  color: ${({ theme }) => theme.white};
  text-align: center;
  display: inline-block;
  margin-top: 19px;
`;

const TransferButton = muiStyled(Button)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "14px",
  textAlign: "center",
  padding: "4px 12px",
  borderRadius: "6px",
  color: theme.palette.white,
  background: theme.palette.black,
  "&:hover": {
    background: theme.palette.primaryGradient,
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
                  src={`/assets/images/provider/${switchAlternateLogo(
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
