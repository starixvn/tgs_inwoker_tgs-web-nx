import { ArrowRightIcon, CloseIcon } from "@/components/UI/CustomizeIcon";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import CopyIconStyled from "@/pages/deposit/components/components/CopyIcon";
import { LoadingIcon, NoGameIcon } from "@/pages/home/components/GameCard/icons";
import { theme } from "@/theme";
import { Dialog as MuiDialog, DialogProps } from "@mui/material";
import { media } from "@tgs-web-nx/constants";
import { RecentBigWinItem } from "@tgs-web-nx/types";
import { i18n, utility } from "@tgs-web-nx/utils";
import { format } from "date-fns";
import React from "react";
import { Img } from "react-image";
import styled from "styled-components";

import { Avatar, BetArea, BetID, BetInfo, BetInfoText, BetInfoValue, BetTime, Divider, Game, GameIcon, GameInfo, PlayerArea, PlayerInfo, PlayNow, ProfitText, ProfitValue, Title } from "./style";

const StyledDialog = styled(MuiDialog)`
  position: relative;

  .MuiDialog-container {
    width: 100%;
  }

  .MuiModal-backdrop {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .MuiPaper-root {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    left: 0;
    right: 0;
    width: auto;
    margin: 0;
    border-radius: 2.4rem;
    background: ${({ theme }) => theme.betSlipBackground};
    border: ${({ theme }) => theme.betSlipBorder};
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.8);
    color: ${({ theme }) => theme.text};

    ${media.sm} {
      max-width: 39rem;
    }
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  padding: 2.4rem;
  margin: 0 auto;
  z-index: 2;
  overflow: hidden;
  font-size: 1.4rem;
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
    return <></>;
  }

  const {
    gameId,
    gameName,
    gameProviderName,
    gameProviderCode,
    gameCode,
    betAmount,
    playerName,
    createTime,
    betId,
    profit,
    playerCode,
    payout,
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
          color: theme.betSlipCloseIconColor,
          zIndex: "4",
          cursor: "pointer",
          "&:hover": {
            color: theme.betSlipCloseIconColorHover,
          },
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
            <BetInfoText>{i18n.t("betSlip.multiplier")}</BetInfoText>
            <BetInfoValue>{(payout / betAmount).toFixed(4)}x</BetInfoValue>
          </BetInfo>
        </BetArea>
        <Divider></Divider>
        <PlayerArea>
          <Avatar>
            <img src={utility.getAvatarUrl(playerCode)} alt="avatar" />
          </Avatar>
          <PlayerInfo>
            <div className="bold">{playerName}</div>
            <BetTime>{format(new Date(createTime), "MM/dd/yyyy hh:mm:ss a")}</BetTime>
            <BetID>
              {i18n.t("betSlip.betID")}: {betId}
              <span>
                <CopyIconStyled copyContent={betId} />
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
