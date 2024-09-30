import { FormControl, ItemContainer, LabelContainer } from "@/components/styled-component/ProfileForms";
import { GreenGradientButton } from "@/components/UI/Button";
import { TextArea } from "@/components/UI/TextArea";
import { TextField } from "@/components/UI/TextField";
import ConfirmDialog from "@/pages/inbox/components/dialog/ConfirmDialog";
import { GeneralService } from "@tgs-web-nx/core";
import { useConfirmDialog } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import React, { useState } from "react";
import styled from "styled-components";

const InboxComposeFormContainer = styled.div`
  padding-top: 16px;
`;
const InputWrapper = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.h6`
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 16px;
`;

const ComposeForm = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const updateSubject = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSubject(event.target.value);
  };

  const updateMessage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setContent(event.target.value);
  };

  // Submit
  const submitCallback = async () => {
    await GeneralService.ComposeInboxItem({ subject, content });
    setSubject("");
    setContent("");
  };

  const { isConfirmDialogOpen, handleSubmit, handleConfirm, handleCancel } =
    useConfirmDialog(submitCallback);

  const isSubmitButtonDisabled = !subject || !content;

  return (
    <InboxComposeFormContainer>
      <ItemContainer>
        <LabelContainer>{i18n.t("subject")}</LabelContainer>
        <FormControl variant="outlined">
          <TextField
            value={subject}
            onChange={updateSubject}
            placeholder={`${i18n.t("pleaseenter")}${`${i18n.t("subject")}`.toLowerCase()}`}
            sx={{
              input: {
                padding: "17px 20px",
              },
            }}
          />
        </FormControl>
      </ItemContainer>

      <ItemContainer>
        <LabelContainer>{i18n.t("yourmessage")}</LabelContainer>
        <TextArea
          value={content}
          onChange={updateMessage}
          placeholder={`${i18n.t("pleaseenter")}${`${i18n.t("yourmessage")}`.toLowerCase()}`}
        />
      </ItemContainer>

      <GreenGradientButton
        onClick={handleSubmit}
        variant={"contained"}
        color={"primary"}
        fullWidth
        disabled={isSubmitButtonDisabled}
      >
        {i18n.t("common.submit")}
      </GreenGradientButton>

      <ConfirmDialog
        isDialogOpen={isConfirmDialogOpen}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </InboxComposeFormContainer>
  );
};

export default ComposeForm;
