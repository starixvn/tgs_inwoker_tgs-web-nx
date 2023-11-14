import { ReactElement, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import BottomAppBar from "@/layouts/components/BottomAppBar";
import DialogHeader from "@/components/UI/Dialog/VipDialogHeader";
import DefaultLayout from "@/layouts/DefaultLayout";
import { BOTTOM_APP_BAR_HEIGHT, HEADER_HEIGHT } from "@/theme/constants";

const VipLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.primaryDark};
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - ${HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});
  margin: ${HEADER_HEIGHT} 0 ${BOTTOM_APP_BAR_HEIGHT};
  position: relative;
  z-index: 1;
`;

type Props = {
  children: ReactElement;
};

const VipLayout = ({ children }: Props) => {
  const history = useHistory();
  const { isDesktopSize } = useRwd();

  const handleCloseDialog = useCallback(() => {
    history.push("/")
  }, []);

  if (isDesktopSize) {
    return <DefaultLayout>{children}</DefaultLayout>;
  }

  return (
    <VipLayoutContainer>
      <DialogHeader
        handleClose={handleCloseDialog}
        dialogHeaderTitle={"VIP"}
      />
      <ContentWrapper>{children}</ContentWrapper>
      <BottomAppBar />
    </VipLayoutContainer>
  );
};

export default VipLayout;
