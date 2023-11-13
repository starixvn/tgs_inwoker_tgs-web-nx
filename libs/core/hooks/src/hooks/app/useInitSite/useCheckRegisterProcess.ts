import { useEffect } from "react";
import config from "@tgs-web-nx/config";
import { useHistory } from "react-router-dom";
import { useAccountStore } from "@tgs-web-nx/core";

export function useCheckRegisterProcess() {
  const history = useHistory();

  const {
    account: { registercompleted },
  } = useAccountStore();

  const checkRegisterProcess = () => {
    if (
      registercompleted === false &&
      config.features.Register_ShowPhone &&
      config.features.ForcedVerification
    ) {
      history.push({
        pathname: "/profile/phone",
        state: { forced: true },
      });
    }
  };

  useEffect(() => {
    // register is not completed
    checkRegisterProcess();
  }, [registercompleted]);
}
