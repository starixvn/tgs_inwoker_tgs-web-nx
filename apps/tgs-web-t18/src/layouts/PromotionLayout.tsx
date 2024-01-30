import { ReactElement, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import DefaultLayout from "@/layouts/DefaultLayout";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";
import BottomAppBar from "@/layouts/components/BottomAppBar";
import { MOBILE_BOTTOM_APP_BAR_HEIGHT, MOBILE_HEADER_HEIGHT } from "@/theme/constants";

const PromotionLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.primaryDark};
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT} - ${MOBILE_BOTTOM_APP_BAR_HEIGHT});
  margin: ${MOBILE_HEADER_HEIGHT} 0 ${MOBILE_BOTTOM_APP_BAR_HEIGHT};
  position: relative;
  z-index: 1;
`;

type Props = {
  children: ReactElement;
};

const PromotionLayout = ({ children }: Props) => {
  const history = useHistory();
  const { isDesktopSize } = useRwd();

  const handleCloseDialog = useCallback(() => {
    history.push("/promotion-list");
  }, []);

  if (isDesktopSize) {
    return <DefaultLayout>{children}</DefaultLayout>;
  }

  return (
    <PromotionLayoutContainer>
      <DialogHeader handleClose={handleCloseDialog} dialogHeaderTitle={"Promotion"} />
      <ContentWrapper>{children}</ContentWrapper>
      <BottomAppBar />
    </PromotionLayoutContainer>
  );
};

export default PromotionLayout;
