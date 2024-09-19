import { useAccountStore } from "@tgs-web-nx/core";
import { useAuth } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameItem } from "@tgs-web-nx/types";
import { Common, i18n } from "@tgs-web-nx/utils";
import { Img } from "react-image";

import PlayIcon from "../PlayIcon";
import { LoadingIcon, NoGameIcon } from "./icons";
import { CardHoverBg, GameCardBg, GameCardContent, GameName, MaintenanceBg, ProviderName } from "./style";

type GameCardProps = {
  gameItem: GameItem;
  isActive: boolean;
  imageUrl: string;
};

const GameCard = ({ gameItem, isActive, imageUrl }: GameCardProps) => {
  const { account } = useAccountStore();
  const { isDesktopSize } = useRwd();
  const { goToLogin } = useAuth();
  const isLogin = !!account.token;
  const { id, gpcode, name, gpname } = gameItem;

  const launchGameHandler = () => {
    if (!isActive) {
      return;
    }
    launchGame();
  };
  const launchGame = () => {
    if (!isLogin) {
      goToLogin();
    } else {
      window.open(`/joingame/${id}/${gpcode}`, '_blank');
    }
  };

  return (
    <GameCardBg onClick={launchGameHandler}>
      <GameCardContent>
        <Img src={imageUrl} loader={<LoadingIcon />} unloader={<NoGameIcon gameName={name} />} />

        <ProviderName>{gpname}</ProviderName>
        {!isActive && (
          <MaintenanceBg>
            <div className="maintenance-text">{i18n.t("common.bebacksoon")}</div>
          </MaintenanceBg>
        )}
      </GameCardContent>

      {isDesktopSize && isActive && (
        <CardHoverBg onClick={launchGameHandler}>
          {name && <GameName>{name}</GameName>}
          <PlayIcon />
        </CardHoverBg>
      )}
    </GameCardBg>
  );
};

export default GameCard;
