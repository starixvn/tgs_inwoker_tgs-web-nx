import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useGeneralStore } from "@tgs-web-nx/core";

export function useHandleMaintenance() {
  const {
    general: { isMaintenance },
  } = useGeneralStore();
  const history = useHistory();

  const handleMaintenance = () => {
    if (isMaintenance) {
      history.push("/maintenance");
    }
  };

  useEffect(() => {
    handleMaintenance();
  }, [isMaintenance]);
}
