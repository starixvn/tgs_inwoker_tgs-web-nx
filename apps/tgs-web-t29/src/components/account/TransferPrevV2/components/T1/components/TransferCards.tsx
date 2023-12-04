import React from "react";
import config from "@tgs-web-nx/config";
import DynamicFont from "react-dynamic-font";
import { styled as muiStyled } from "@mui/material/styles";
import { Common, i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import { useGameStore } from "@tgs-web-nx/core";
import { Button } from "@/components/UI/Button";

const TransferContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
`;

const GameTranferWallet = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  border-radius: 4px;
  border: solid 1px
    ${({ theme }) => {
      return theme.darkMode ? theme.customProfileBackground50 : "#dddedf";
    }};
  background: ${({ theme }) => theme.blue20};
  padding: 10px 10px 10px 3px;
  gap: 10px;
`;
const GameTranferLeftWrap = styled.div`
  max-width: 70px;
`;

const GameTranferRighttWrap = styled.div`
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
  color: ${({ theme }) => theme.blue50};
  margin-top: 7px;
`;
const GameWalletAmount = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  color: ${({ theme }) => {
    return theme.darkMode ? "#fff" : "#000";
  }};
  text-align: center;
  display: inline-block;
  margin-top: 3px;
`;

const TransferButton = muiStyled(Button)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "400",
  lineHeight: "14px",
  textAlign: "center",
  padding: "4px",
  background: theme.palette.blue30,
  border: "none",
  "&:hover": {
    background: theme.palette.primary.main,
  },
}));

type Props = {
  handleTranferIn: (gpcode: string) => void;
};

const TransferCards = ({ handleTranferIn }: Props) => {
  const { game } = useGameStore();

  const switchAlternateLogo = (condition) => {
    if (condition) {
      return "alternate/";
    } else {
      return "";
    }
  };

  return (
    <TransferContainer>
      {game.providerList
        .filter((provider) => provider.status === 0 && provider.transferwallet)
        .filter((provider) => {
          if (!config.features.MergeEVORTNT) {
            return provider;
          }

          if (
            provider.gpcode === "NTTF" ||
            provider.gpcode === "RTTF" ||
            provider.gpcode === "BTG" ||
            provider.gpcode === "NLC"
          ) {
            return false;
          }

          return provider;
        })
        .map((item, index) => {
          const displayLogo = () => {
            if (item.gpcode.toLowerCase() === "evotf" && config.features.MergeEVORTNT) {
              return "evontrt";
            } else {
              return item.abbreviation.toLowerCase();
            }
          };

          return (
            <GameTranferWallet key={index}>
              <GameTranferLeftWrap>
                <Logo
                  src={`/assets/images/provider/${switchAlternateLogo(
                    config.features.UseAlternateLogo || false,
                  )}${displayLogo()}.png`}
                  alt={displayLogo()}
                />
                <GameName>
                  <DynamicFont content={item.name} />
                </GameName>
              </GameTranferLeftWrap>
              <GameTranferRighttWrap>
                <TransferButton
                  disabled={item.maintenance === 1}
                  onClick={() => handleTranferIn(item.gpcode)}
                >
                  {i18n.t("transfer.oneKeyTransferIn")}
                </TransferButton>
                <GameWalletAmount>
                  {item.maintenance === 1
                    ? i18n.t("transfer.maintenance")
                    : "$" + Common.formatNumberWithCommas(item.balance)}
                </GameWalletAmount>
              </GameTranferRighttWrap>
            </GameTranferWallet>
          );
        })}
    </TransferContainer>
  );
};

export default TransferCards;
