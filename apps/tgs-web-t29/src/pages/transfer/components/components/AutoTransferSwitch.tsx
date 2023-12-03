import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useAutoTransferSwitch } from "@tgs-web-nx/core/features";
import Loading from "@/components/UI/Loading";
import { Button } from "@/components/UI/Button";
import { Switch } from "@/components/UI/Switch";

const AutoTransferContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 15px;
`;

const AutoTransferSwitch = (props: React.HTMLProps<HTMLDivElement>) => {
  const { isChecked, isLoading, handleSwitchAutoTransfer, performWithdrawFromEveryBrand } =
    useAutoTransferSwitch();

  return (
    //@ts-ignore
    <AutoTransferContainer {...props}>
      <div>
        {`${i18n.t("transfer.autoTransfer")} (${
          isChecked ? i18n.t("transfer.on") : i18n.t("transfer.off")
        })`}
      </div>
      <Switch checked={isChecked} onChange={handleSwitchAutoTransfer} />

      <Button
        style={{ marginTop: 0, marginLeft: "auto" }}
        onClick={() => {
          performWithdrawFromEveryBrand();
        }}
      >
        {i18n.t("transfer.oneKeyTransferOut")}
      </Button>
      <Loading show={isLoading} />
    </AutoTransferContainer>
  );
};

export default React.memo(AutoTransferSwitch);
