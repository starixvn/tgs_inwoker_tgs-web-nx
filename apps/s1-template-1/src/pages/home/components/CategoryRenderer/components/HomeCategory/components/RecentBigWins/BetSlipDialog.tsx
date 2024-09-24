import { ArrowRightIcon, CloseIcon, CopyIcon } from "@/components/UI/CustomizeIcon";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import { LoadingIcon, NoGameIcon } from "@/pages/home/components/GameCard/icons";
import { Dialog as MuiDialog, DialogProps } from "@mui/material";
import { media } from "@tgs-web-nx/constants";
import { RecentBigWinItem } from "@tgs-web-nx/types";
import { i18n, utility } from "@tgs-web-nx/utils";
import React from "react";
import { Img } from "react-image";
import styled from "styled-components";

import { Avatar, BetArea, BetID, BetInfo, BetInfoText, BetInfoValue, Divider, Game, GameIcon, GameInfo, PlayerArea, PlayerInfo, PlayNow, ProfitText, ProfitValue, Title } from "./style";

const StyledDialog = styled(MuiDialog)`
  position: relative;

  .MuiModal-backdrop {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .MuiPaper-root {
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    margin: 0;
    border-radius: 2.4rem 2.4rem 0 0;
    background: linear-gradient(180deg, #032f63 0%, #111923 50.9%);
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.8);

    ${media.sm} {
      position: relative;
      max-width: 39rem;
      border-radius: 2.4rem;
    }
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  padding: 2.4rem;
  margin: 0 auto;
  z-index: 2;
  overflow: hidden;
`;

type Props = {
  open: boolean;
  onClose: () => void;
  dialogHeaderTitle?: string;
  showInMobile?: boolean;
  data: RecentBigWinItem | undefined;
  launchGame: (gameId: number, gameProviderCode: string) => void;
} & DialogProps;

const BetSlipDialog = ({
  open,
  onClose,
  showInMobile,
  data,
  launchGame,
  ...others
}: Props & DialogProps) => {
  if (!data) {
    return null;
  }

  const {
    gameId,
    gameName,
    gameProviderName,
    gameProviderCode,
    gameCode,
    betAmount,
    payout,
    playerName,
    createTime,
    betId,
    profit,
  } = data;

  return (
    <StyledDialog
      fullWidth={true}
      open={open}
      TransitionComponent={UpTransition}
      onClose={onClose}
      maxWidth={"sm"}
      {...others}
    >
      <CloseIcon
        sx={{
          position: "absolute",
          top: "1.9rem",
          right: "2.4rem !important",
          width: "3.2rem",
          height: "3.2rem",
          color: "#9CACC2",
          zIndex: "4",
          cursor: "pointer",
        }}
        viewBox="0 0 33 32"
        className="icon-close"
        onClick={onClose}
      />
      <ChildContainer>
        <Title>{i18n.t("betSlip.title")}</Title>
        <ProfitText>{i18n.t("betSlip.profit")}</ProfitText>
        <ProfitValue>{profit}</ProfitValue>
        <BetArea>
          <BetInfo>
            <BetInfoText>{i18n.t("betSlip.betAmount")}</BetInfoText>
            <BetInfoValue>{betAmount}</BetInfoValue>
          </BetInfo>
          <BetInfo>
            <BetInfoText>{i18n.t("betSlip.payout")}</BetInfoText>
            <BetInfoValue>{payout}</BetInfoValue>
          </BetInfo>
        </BetArea>
        <Divider></Divider>
        <PlayerArea>
          <Avatar src="/assets/images/avatars/user1.png" alt="avatar" />
          <PlayerInfo>
            <div className="bold">{playerName}</div>
            <p>{createTime}</p>
            <BetID>
              {i18n.t("betSlip.betID")}: {betId}
              <span>
                <CopyIcon
                  className="icon-copy"
                  sx={{ fontSize: "2rem", color: "#55657e" }}
                  viewBox="0 0 16 16"
                  onClick={() => utility.copyText(betId)}
                />
              </span>
            </BetID>
          </PlayerInfo>
        </PlayerArea>

        <Game
          onClick={() => {
            launchGame(gameId, gameProviderCode);
          }}
        >
          <GameIcon>
            <Img
              className="icon"
              src={utility.getGameUrl(gameProviderCode, gameCode, true)}
              loader={<LoadingIcon />}
              unloader={<NoGameIcon />}
            />
          </GameIcon>

          <GameInfo>
            <div>{gameName}</div>
            <div>{gameProviderName}</div>
          </GameInfo>
          <PlayNow>
            {i18n.t("betSlip.playNow")}
            <ArrowRightIcon
              className="icon"
              height={15}
              width={10}
              sx={{ width: "1rem", height: "1.5rem" }}
              viewBox="0 0 10 15"
            />
          </PlayNow>
        </Game>
      </ChildContainer>
    </StyledDialog>
  );
};

export default React.memo(BetSlipDialog);
