import React from "react";
import config from "@tgs-web-nx/config";
import DynamicFont from "react-dynamic-font";
import { Common, i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import { useGameStore } from "@tgs-web-nx/core";
import { Button } from "@/components/UI/Button";

const TransferContainer = styled.div`
  min-height: 91px;
`;

const GameTranferWallet = styled.div`
  width: 280px;
  height: 98px;
  border-radius: 4px;
  border: solid 1px ${({ theme }) => {
    return theme.darkMode ? theme.customProfileBackground50 : "#dddedf";
  }};
  background: ${({ theme }) => {
    return theme.darkMode
      ? theme.customProfileBackground50
      : `linear-gradient(to top, #f4f4f4, #ffffff);`;
  }}
  margin: 0 10px 10px 0;
  float: left;
`;
const GameTranferLeftWrap = styled.div`
  width: 100px;
  padding: 10px 0;
  float: left;
`;
const GameIcon = styled.div`
  height: 50px;
  width: 50px;
  background: url(${(props) => props.src}) no-repeat;
  background-size: contain;
  background-position: center;
  margin: 0 auto;
  display: block;

  transform: scale(1.5);
`;
const GameName = styled.div`
  font-size: 14px;
  text-align: center;
  color: #aeaeae;
  margin-top: 5px;
`;
const GameWalletAmount = styled.div`
  font-family: Arial;
  font-size: 22px;
  text-align: right;
  color: ${({ theme }) => {
    return theme.darkMode ? "#fff" : "#000";
  }};
  margin: 21px 0 0 0px;
  width: 170px;
  display: inline-block;
`;

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
                <GameIcon
                  src={`/assets/images/provider/${switchAlternateLogo(
                    config.features.UseAlternateLogo || false,
                  )}${displayLogo()}.png`}
                ></GameIcon>
                <GameName>
                  <DynamicFont content={item.name} />
                </GameName>
              </GameTranferLeftWrap>

              <Button
                disabled={item.maintenance === 1}
                onClick={() => handleTranferIn(item.gpcode)}
              >
                {i18n.t("transfer.oneKeyTransferIn")}
              </Button>
              <GameWalletAmount>
                {item.maintenance === 1
                  ? i18n.t("transfer.maintenance")
                  : "$" + Common.formatNumberWithCommas(item.balance)}
              </GameWalletAmount>
            </GameTranferWallet>
          );
        })}
    </TransferContainer>
  );
};

export default TransferCards;
