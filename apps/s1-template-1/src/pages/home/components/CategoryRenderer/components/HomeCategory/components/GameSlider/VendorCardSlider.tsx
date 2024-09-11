import DesktopVendorCard from "@/pages/home/components/VendorCard/desktop";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { GameService, useAccountStore } from "@tgs-web-nx/core";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { Common, utility } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";

interface IGameSlider {
  data: Array<any>;
  gameType: string;
  extraClassName?: string;
}

const VendorCardSlider: React.FC<IGameSlider> = (props: IGameSlider) => {
  const { data, gameType } = props;
  const history = useHistory();
  const { account } = useAccountStore();
  const { activeGameType } = useHomeGameContext();

  const launchLobbyGame = (gpcode: string, gtype: GameTypeEnum = GameTypeEnum.SPORTS) => {
    if (!account.token) {
      history.push("/login");
      return;
    }

    if (activeGameType === GameTypeEnum.COCKFIGHT) {
      if (gpcode === "SM01") {
        const gameWindow = window.open("", "Cockfight");
        if (gameWindow) {
          GameService.GetCockfight()
            .then((res) => {
              gameWindow.document.write(res?.data);
              gameWindow.document.close();
              gameWindow.focus();
            })
            .catch(() => {
              gameWindow.close();
            });
        }
      } else {
        Common.closePreviousPopup();
        Common.PopupCenter(`/joinlobbygame/${gtype}/${gpcode}`, "gamewindow");
      }
    } else {
      const audioElement = document.getElementById("audio") as HTMLAudioElement | null;
      if (audioElement) {
        audioElement.volume = 0;
      }
      Common.closePreviousPopup();
      Common.PopupCenter(`/joinlobbygame/${gtype}/${gpcode}`, "gamewindow");
    }
  };

  return (
    <>
      {data.map((item, index) => {
        const { code: gpCode, status, name } = item;

        if (gpCode === "BC") return null;
        return (
          <div className="embla__slide" key={index}>
            <DesktopVendorCard
              key={gpCode}
              bgUrl={`${utility.imagePathGenerator(`home/desktop/${gameType}/bg.png`)}`}
              imageUrl={`${utility.imagePathGenerator(`home/desktop/${gameType}/${gpCode}.webp`)}`}
              venderLogoUrl={`${utility.imagePathGenerator(
                `home/provider_logo/${gameType}/${gpCode}.png`,
              )}`}
              launchGame={() => launchLobbyGame(gpCode, GameTypeEnum.LIVE)}
              status={status}
              venderName={name}
            />
          </div>
        );
      })}
    </>
  );
};

export default VendorCardSlider;
