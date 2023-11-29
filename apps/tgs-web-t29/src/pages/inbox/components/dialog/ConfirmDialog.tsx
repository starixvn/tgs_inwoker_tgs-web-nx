import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import Dialog from "@/components/UI/Dialog/Dialog";
import { SubmitButton } from "@/components/styled-component/ProfileForms";

const Hint = styled.div`
  color: ${({ theme }) => theme.gray50};
  text-align: center;
  margin-bottom: 20px;
`;

type Props = {
  isDialogOpen: boolean;
  handleConfirm: () => Promise<void>;
  handleCancel: () => Promise<void>;
};
const ConfirmDialog = ({ isDialogOpen, handleConfirm, handleCancel }: Props) => {
  return (
    <Dialog open={isDialogOpen} onClose={handleCancel} fullWidth maxWidth={"sm"}>
      <Hint>{i18n.t("confirmSubmit")}?</Hint>

      <SubmitButton fullWidth onClick={handleConfirm}>
        {i18n.t("common.submit")}
      </SubmitButton>
    </Dialog>
  );
};

export default React.memo(ConfirmDialog);
