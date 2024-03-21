import config from "@tgs-web-nx/config";
import { livechatCode } from "./LiveChathardCode";

export const useLivechat = () => {
  const initLivechat = () => {
    const launchLivechat = livechatCode[config.brand];
    launchLivechat();
  };
  return {
    initLivechat,
  };
};

export default useLivechat;
