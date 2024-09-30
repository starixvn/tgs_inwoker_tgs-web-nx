import { GreenGradientButton } from "@/components/UI/Button";
import DialogPopup from "@/components/UI/Dialog/DialogPopup";
import { DialogContainer, DialogContent } from "@/components/UI/Dialog/dialogStyles";
import { i18n } from "@tgs-web-nx/utils";
import React from "react";
import styled from "styled-components";

const Hint = styled.div`
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.4rem;
`;

type Props = {
  isDialogOpen: boolean;
  handleConfirm: () => Promise<void>;
  handleCancel: () => Promise<void>;
};
const ConfirmDialog = ({ isDialogOpen, handleConfirm, handleCancel }: Props) => {
  return (
    <DialogPopup open={isDialogOpen} onClose={handleCancel} >
      <DialogContainer>
        <DialogContent>{i18n.t("confirmSubmit")}?</DialogContent>
        <GreenGradientButton fullWidth onClick={handleConfirm}>
          {i18n.t("common.submit")}
        </GreenGradientButton>
      </DialogContainer>
     
    </DialogPopup>
  );
};

export default React.memo(ConfirmDialog);
