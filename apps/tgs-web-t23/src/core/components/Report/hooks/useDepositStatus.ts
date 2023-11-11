import { useEffect, useState } from "react";
import { WithdrawalStatusDictionary } from "@tgs-web-nx/types";
import { ReportService } from "@tgs-web-nx/core";

export function useDepositStatus() {
  const [statusDictionary, setStatusDictionary] = useState<WithdrawalStatusDictionary>({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    ReportService.GetDepositStatus().then((response) => {
      if (response.IsSuccess) {
        setStatusDictionary(response.data);
      }
    });
  }, []);

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };

  return {
    statusDictionary,
    status,
    handleStatusChange,
  };
}
