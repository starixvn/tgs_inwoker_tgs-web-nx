import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useGeneralStore } from "@/core/stores/useGeneralStore";

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
