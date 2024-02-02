import React from "react";
import { useHistory } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications } from "@tgs-web-nx/core/features";
import { useRwd, useTransferPage } from "@tgs-web-nx/core/hooks";
import { useSnackbar } from "notistack";
import styled from "styled-components";
import TransferPrevV2 from "@/components/account/TransferPrevV2";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import iconTransfer from "@/assets/t21/images/account/navItem/icon-transfer.svg";
import AccountPaper from "@/components/project/AccountPaper";
import { PageContainer } from "@/components/styled-component/PageContainer";
import AutoTransferSwitch from "@/pages/transfer/components/AutoTransferSwitch";

const TransferPage = () => {
  const { getAllGameBalance } = useTransferPage();

  const { isDesktopSize, isMobileSize } = useRwd();
  const { alert } = useNotifications();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const SubTitle = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.gray80};
    display: inline-block;
    width: 100%;
    margin: 25px 0 5px 0;
    padding-bottom: 8px;
  `;

  return (
    <PageContainer>
      {isDesktopSize && <UserWalletInfo />}
      <AccountPaper
        pageName={i18n.t("common.transfer")}
        iconUrl={iconTransfer}
        hidePaperColorInMobile={false}
      >
        <TransferPrevV2
          alert={alert}
          history={history}
          getAllGameBalance={getAllGameBalance}
          enqueueSnackbar={enqueueSnackbar}
        />
      </AccountPaper>
      {isMobileSize && (
        <>
          <SubTitle>{i18n.t("transfer.transferWallet")}</SubTitle>
          <AutoTransferSwitch />
        </>
      )}
    </PageContainer>
  );
};

export default TransferPage;
