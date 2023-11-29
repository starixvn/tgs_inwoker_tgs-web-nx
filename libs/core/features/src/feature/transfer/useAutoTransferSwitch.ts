import { useCallback, useEffect, useState } from "react";
import { WalletService } from "@tgs-web-nx/core";

export function useAutoTransferSwitch() {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSwitchAutoTransfer = useCallback(async () => {
    const prevAutoTransferStatus = isChecked;

    try {
      setIsLoading(true);

      setIsChecked((prevState) => !prevState);

      const updateAutoTransferStatusResDto = await WalletService.UpdateAutoTransferStatus();

      if (!updateAutoTransferStatusResDto.IsSuccess) {
        throw new Error(
          `Update AutoTransferStatus Failed, ${JSON.stringify(updateAutoTransferStatusResDto)}`,
        );
      }
    } catch (error) {
      console.error(error);
      setIsChecked(prevAutoTransferStatus);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAutoTransferStatus = useCallback(async () => {
    try {
      const getAutoTransferStatusResDto = await WalletService.GetAutoTransferStatus();

      if (!getAutoTransferStatusResDto.IsSuccess) {
        throw new Error(
          `Update AutoTransferStatus Failed, ${JSON.stringify(getAutoTransferStatusResDto)}`,
        );
      }

      const transferStatus = getAutoTransferStatusResDto.data;
      setIsChecked(transferStatus);
    } catch (error: any) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAutoTransferStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isChecked,
    isLoading,
    handleSwitchAutoTransfer,
  };
}
