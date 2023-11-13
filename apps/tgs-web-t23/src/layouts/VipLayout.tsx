import { ReactElement, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import BottomAppBar from "@/layouts/components/BottomAppBar";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";
import DefaultLayout from "@/layouts/DefaultLayout";

const VipLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.primaryDark};
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - 80px - 82px); // 80px:Header, 82px: BottomAppBar
  margin: 80px 0 82px;
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
