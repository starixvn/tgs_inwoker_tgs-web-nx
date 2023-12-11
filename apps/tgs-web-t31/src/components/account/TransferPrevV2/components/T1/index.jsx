import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Loading from "@/components/UI/Loading";
import TransferCards from "@/components/account/TransferPrevV2/components/T1/components/TransferCards";
import QuickTransfer from "@/components/account/TransferPrevV2/components/T1/components/QuickTransfer";
import AutoTransferSwitch from "@/pages/transfer/components/AutoTransferSwitch";
import TransferCard from "@/pages/transfer/components/TransferCard";
import { SubmitButton } from "@/components/styled-component/ProfileForms";

const Container = styled.div`
  width: 100%;
`;

const InnerWrap = styled.div``;

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.blue50};
  display: inline-block;
  width: 100%;
  margin: 25px 0 5px 0;
  padding-bottom: 8px;
`;

const Template1 = ({
  wallet,
  game,
  transferFrom,
  transferTo,
  transferAmount,
  mainAccountId,
  disabled,
  loading,
  handleTransferFromChange,
  handleTransferToChange,
  handleTransferAmountChange,
  handleTransferClick,
  handleTransferIn,
}) => {
  const { isLargeDesktopSize } = useRwd();
  return (
    <Container>
      <InnerWrap>
        {isLargeDesktopSize ? (
          <QuickTransfer
            transferFrom={transferFrom}
            handleTransferFromChange={handleTransferFromChange}
            transferTo={transferTo}
            handleTransferToChange={handleTransferToChange}
            mainAccountId={mainAccountId}
            transferAmount={transferAmount}
            handleTransferAmountChange={handleTransferAmountChange}
            disabled={disabled}
            handleTransferClick={handleTransferClick}
          />
        ) : (
          <TransferCard
            fromWallet={transferFrom}
            handleChangeFromWallet={handleTransferFromChange}
            toWallet={transferTo}
            handleChangeToWallet={handleTransferToChange}
            transferAmount={transferAmount}
            handleChangeTransferAmount={handleTransferAmountChange}
            mainAccountId={mainAccountId}
          >
            <SubmitButton
              onClick={handleTransferClick}
              variant={"contained"}
              color={"primary"}
              fullWidth
              disabled={
                transferAmount === 0 ||
                transferAmount === "" ||
                transferTo === transferFrom ||
                disabled === true
              }
            >
              {i18n.t("common.confirm")}
            </SubmitButton>
          </TransferCard>
        )}

        <SubTitle>{i18n.t("transfer.transferWallet")}</SubTitle>
        <AutoTransferSwitch style={{ marginBottom: "20px" }} />
        {isLargeDesktopSize && <TransferCards handleTransferIn={handleTransferIn} />}
        <Loading show={loading || wallet.transferLoading || wallet.updateBalanceloading}></Loading>
      </InnerWrap>
    </Container>
  );
};

export default Template1;
