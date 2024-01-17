import React, { useState } from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { GeneralService } from "@tgs-web-nx/core";
import { useConfirmDialog } from "@tgs-web-nx/core/features";
import { TextField } from "@/components/UI/TextField";
import { FormControl, SubmitButton } from "@/components/styled-component/ProfileForms";
import { TextArea } from "@/components/UI/TextArea";
import ConfirmDialog from "@/pages/inbox/components/dialog/ConfirmDialog";
import { media } from "@/theme/breakpoints";

const InboxComposeFormContainer = styled.div`
  padding: 24px 20px;
  background: ${({ theme }) => theme.black02};

  ${media.sm} {
    background: ${({ theme }) => theme.black03};
    border-radius: 10px;
    padding: 24px 40px;
  }
`;

const InputWrapper = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.h6`
  color: ${({ theme }) => theme.white};
  font-size: 1.125rem;
  font-weight: 400;
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

  const { isSubmitted, isConfirmDialogOpen, handleSubmit, handleConfirm, handleCancel } =
    useConfirmDialog(submitCallback);

  const isSubmitButtonDisabled = isSubmitted || !subject || !content;

  return (
    <InboxComposeFormContainer>
      <InputWrapper>
        <Label>{i18n.t("subject")}</Label>
        <FormControl variant="outlined">
          <TextField
            value={subject}
            onChange={updateSubject}
            placeholder={`${i18n.t("pleaseenter")}${`${i18n.t("subject")}`.toLowerCase()}`}
            sx={{
              input: {
                padding: "8.5px 10px",
              },
            }}
          />
        </FormControl>
      </InputWrapper>

      <InputWrapper>
        <Label>{i18n.t("yourmessage")}</Label>
        <TextArea
          value={content}
          onChange={updateMessage}
          placeholder={`${i18n.t("pleaseenter")}${`${i18n.t("yourmessage")}`.toLowerCase()}`}
        />
      </InputWrapper>

      <SubmitButton
        onClick={handleSubmit}
        variant={"contained"}
        color={"primary"}
        fullWidth
        disabled={isSubmitButtonDisabled}
      >
        {i18n.t("common.submit")}
      </SubmitButton>

      <ConfirmDialog
        isDialogOpen={isConfirmDialogOpen}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      />
    </InboxComposeFormContainer>
  );
};

export default ComposeForm;
