import React, { createContext, useCallback, useState } from "react";
import { GetInboxItemDetailReqDto, InboxItemDetail, ReadInboxItemReqDto } from "@tgs-web-nx/types";
import { GeneralService } from "@tgs-web-nx/core";

const initialState: {
  inboxItemDetail: InboxItemDetail | null;
  isLoading: boolean;
  error: Error | null;
  isDetailDialogOpen: boolean;
  selectInboxItemDetail: (id: string) => Promise<void>;
  handleCloseDetailDialog: () => void;
} = {
  inboxItemDetail: null,
  isLoading: false,
  error: null,
  isDetailDialogOpen: false,
  selectInboxItemDetail: () => Promise.resolve(),
  handleCloseDetailDialog: () => {},
};

export const InboxDetailContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
};

interface InboxItemDetailState {
  inboxItemDetail: InboxItemDetail | null;
  isLoading: boolean;
  error: Error | null;
}

export const InboxDetailContextProvider = ({ children }: ProviderProps) => {
  const [inboxItemDetailState, setInboxItemDetailState] = useState<InboxItemDetailState>({
    inboxItemDetail: null,
    isLoading: false,
    error: null,
  });

  const fetchInboxDetail = useCallback(
    async (getInboxItemDetailReqDto: GetInboxItemDetailReqDto) => {
      if (!getInboxItemDetailReqDto.letterId) {
        setInboxItemDetailState({
          inboxItemDetail: null,
          isLoading: false,
          error: null,
        });
        return;
      }

      // no need to reFetch detail while id doesn't change
      if (getInboxItemDetailReqDto.letterId === inboxItemDetailState.inboxItemDetail?.id) {
        return;
      }

      try {
        setInboxItemDetailState((prevState) => ({
          ...prevState,
          isLoading: true,
          error: null,
        }));
        const getInboxItemDetailResDto =
          await GeneralService.GetInboxItemDetail(getInboxItemDetailReqDto);

        if (!getInboxItemDetailResDto.IsSuccess) {
          throw new Error(`Req failed, ${getInboxItemDetailReqDto}`);
        }

        const inboxItemDetail = getInboxItemDetailResDto.data;

        setInboxItemDetailState((prevState) => ({
          inboxItemDetail,
          isLoading: false,
          error: null,
        }));

        return inboxItemDetail;
      } catch (error: any) {
        setInboxItemDetailState((prevState) => ({
          ...prevState,
          isLoading: false,
          error: error,
        }));
      }
    },
    [inboxItemDetailState.inboxItemDetail?.id],
  );

  const markInboxDetailAsRead = useCallback(async (readInboxItemReqDto: ReadInboxItemReqDto) => {
    await GeneralService.ReadInboxItem(readInboxItemReqDto);
  }, []);

  // dialog actions
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const selectInboxItemDetail = useCallback(
    async (id: string) => {
      setIsDetailDialogOpen(true);
      await fetchInboxDetail({ letterId: id });
      await markInboxDetailAsRead({ letterId: id });
    },
    [fetchInboxDetail],
  );

  const handleCloseDetailDialog = useCallback(() => {
    setIsDetailDialogOpen(false);
  }, []);

  return (
    <InboxDetailContext.Provider
      value={{
        inboxItemDetail: inboxItemDetailState.inboxItemDetail,
        isLoading: inboxItemDetailState.isLoading,
        error: inboxItemDetailState.error,
        selectInboxItemDetail,
        isDetailDialogOpen,
        handleCloseDetailDialog,
      }}
    >
      {children}
    </InboxDetailContext.Provider>
  );
};
