import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useAutoTransferSwitch } from "@tgs-web-nx/core/features";
import Loading from "@/components/UI/Loading";
import { Button } from "@/components/UI/Button";

const AutoTransferContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CustomSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: normal;
  color: ${({ theme }) => theme.white};

  & > :first-child {
    margin-right: 10px;
  }
`;

const AutoTransferSwitch = () => {
  const { isChecked, isLoading, handleSwitchAutoTransfer, performWithdrawFromEveryBrand } =
    useAutoTransferSwitch();

  return (
    <>
      <AutoTransferContainer>
        <div>
          {`${i18n.t("transfer.autoTransfer")} (${
            isChecked ? i18n.t("transfer.on") : i18n.t("transfer.off")
          })`}
        </div>
        <CustomSwitchContainer checked={isChecked} onChange={handleSwitchAutoTransfer} />

        <Button
          style={{ marginTop: 0, marginLeft: 10 }}
          onClick={() => {
            performWithdrawFromEveryBrand();
          }}
        >
          {i18n.t("transfer.oneKeyTransferOut")}
        </Button>
      </AutoTransferContainer>
      <Loading show={isLoading} />
    </>
  );
};

export default React.memo(AutoTransferSwitch);
