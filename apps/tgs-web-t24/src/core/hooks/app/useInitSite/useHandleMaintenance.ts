import { useEffect } from "react";
import { useGeneralStore } from "@/core/stores/useGeneralStore";
import { useHistory } from "react-router-dom";

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
