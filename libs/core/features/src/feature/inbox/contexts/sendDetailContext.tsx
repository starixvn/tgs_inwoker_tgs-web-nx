import React, { createContext, useCallback, useState } from "react";
import { GetSendItemDetailReqDto, SendItemDetail } from "@tgs-web-nx/types";
import { GeneralService } from "@tgs-web-nx/core";

const initialState: {
  sendItemDetail: SendItemDetail | null;
  isLoading: boolean;
  error: Error | null;
  isDetailDialogOpen: boolean;
  selectSendItemDetail: (id: string) => Promise<void>;
  handleCloseDetailDialog: () => void;
} = {
  sendItemDetail: null,
  isLoading: false,
  error: null,
  isDetailDialogOpen: false,
  selectSendItemDetail: () => Promise.resolve(),
  handleCloseDetailDialog: () => {},
};

export const SendDetailContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
};

interface SendItemDetailState {
  sendItemDetail: SendItemDetail | null;
  isLoading: boolean;
  error: Error | null;
}

export const SendDetailContextProvider = ({ children }: ProviderProps) => {
  const [sendItemDetailState, setSendItemDetailState] = useState<SendItemDetailState>({
    sendItemDetail: null,
    isLoading: false,
    error: null,
  });

  const fetchSendDetail = useCallback(
    async (getSendItemDetailReqDto: GetSendItemDetailReqDto) => {
      if (!getSendItemDetailReqDto.deliveryId) {
        setSendItemDetailState({
          sendItemDetail: null,
          isLoading: false,
          error: null,
        });
        return;
      }

      // no need to reFetch detail while id doesn't change
      if (getSendItemDetailReqDto.deliveryId === sendItemDetailState.sendItemDetail?.id) {
        return;
      }

      try {
        setSendItemDetailState((prevState) => ({
          ...prevState,
          isLoading: true,
          error: null,
        }));
        const getSendItemDetailResDto =
          await GeneralService.GetSendItemDetail(getSendItemDetailReqDto);

        if (!getSendItemDetailResDto.IsSuccess) {
          throw new Error(`Req failed, ${getSendItemDetailReqDto}`);
        }

        const sendItemDetail = getSendItemDetailResDto.data;

        setSendItemDetailState((prevState) => ({
          sendItemDetail,
          isLoading: false,
          error: null,
        }));

        return sendItemDetail;
      } catch (error: any) {
        setSendItemDetailState((prevState) => ({
          ...prevState,
          isLoading: false,
          error: error,
        }));
      }
    },
    [sendItemDetailState.sendItemDetail?.id],
  );

  // dialog actions
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const selectSendItemDetail = useCallback(
    async (id: string) => {
      setIsDetailDialogOpen(true);
      await fetchSendDetail({ deliveryId: id });
    },
    [fetchSendDetail],
  );

  const handleCloseDetailDialog = useCallback(() => {
    setIsDetailDialogOpen(false);
  }, []);

  return (
    <SendDetailContext.Provider
      value={{
        sendItemDetail: sendItemDetailState.sendItemDetail,
        isLoading: sendItemDetailState.isLoading,
        error: sendItemDetailState.error,
        selectSendItemDetail,
        isDetailDialogOpen,
        handleCloseDetailDialog,
      }}
    >
      {children}
    </SendDetailContext.Provider>
  );
};
