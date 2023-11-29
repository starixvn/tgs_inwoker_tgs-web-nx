import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useAutoTransferSwitch } from "@tgs-web-nx/core/features";
import { Switch } from "@/components/UI/Switch";
import Loading from "@/components/UI/Loading";

const AutoTransferContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.937rem;
`;

const CustomSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: normal;
  color: ${({ theme }) => theme.text};

  & > :first-child {
    margin-right: 10px;
  }
`;

const AutoTransferSwitch = () => {
  const { isChecked, isLoading, handleSwitchAutoTransfer } = useAutoTransferSwitch();

  return (
    <>
      <AutoTransferContainer>
        <CustomSwitchContainer>
          <Switch checked={isChecked} onChange={handleSwitchAutoTransfer} />
          <div>
            {isLoading}
            {i18n.t("transfer.autoTransfer")} (
            {isChecked ? i18n.t("transfer.on") : i18n.t("transfer.off")})
          </div>
        </CustomSwitchContainer>
      </AutoTransferContainer>

      <Loading show={isLoading} />
    </>
  );
};

export default React.memo(AutoTransferSwitch);
