import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { InboxItemDetail, ReplyInboxItemReqDto } from "@tgs-web-nx/types";
import { useConfirmDialog } from "@tgs-web-nx/core/features";
import { TextField } from "@/components/UI/TextField";
import { FormControl, SubmitButton } from "@/components/styled-component/ProfileForms";
import { TextArea } from "@/components/UI/TextArea";
import ConfirmDialog from "@/pages/inbox/components/dialog/ConfirmDialog";
import { theme } from "@/theme";

const InboxComposeFormContainer = styled.div`
  padding: 16px;
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

const OriginalMessage = styled.div`
  max-height: 120px;
  padding: 10px;
  white-space: pre-line;
  border: ${({ theme }) => `1px solid ${theme.gray10}`};
  color: ${({ theme }) => theme.text};
  overflow: auto;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
`;

type Props = {
  inboxItemDetail: InboxItemDetail;
  handleSubmitReply: (replyInboxItemReqDto: ReplyInboxItemReqDto) => Promise<void>;
};

const ReplyForm = ({ inboxItemDetail, handleSubmitReply }: Props) => {
  const { subject, content } = inboxItemDetail;
  const displayedSubject = `Re: ${subject}`;
  const [message, setMessage] = useState("");

  const updateMessage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  // Submit
  const submitCallback = useCallback(async () => {
    await handleSubmitReply({ letterId: inboxItemDetail.id, content: message });
  }, [handleSubmitReply, inboxItemDetail.id, message]);

  const { isSubmitted, isConfirmDialogOpen, handleSubmit, handleConfirm, handleCancel } =
    useConfirmDialog(submitCallback);

  return (
    <InboxComposeFormContainer>
      <InputWrapper>
        <Label>{i18n.t("subject")}</Label>
        <FormControl variant="outlined">
          <TextField
            value={displayedSubject}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: theme.white50,
              },
              input: {
                border: `1px solid ${theme.white30}`,
                padding: "17px 0",
                color: theme.text,
                "&::placeholder": {
                  color: theme.white50,
                },
              },
            }}
            disabled={true}
          />
        </FormControl>
      </InputWrapper>

      <InputWrapper>
        <Label>{i18n.t("yourmessage")}</Label>
        <TextArea
          sx={{
            border: `1px solid ${theme.white30}`,
            input: {
              color: theme.text,
              "&::placeholder": {
                color: theme.white50,
              },
            },
          }}
          value={message}
          onChange={updateMessage}
          placeholder={`${i18n.t("pleaseenter")}${`${i18n.t("yourmessage")}`.toLowerCase()}`}
        />
      </InputWrapper>

      <InputWrapper>
        <Label>{i18n.t("originalmessage")}</Label>
        <OriginalMessage>{content}</OriginalMessage>
      </InputWrapper>

      <SubmitButton
        onClick={handleSubmit}
        variant={"contained"}
        color={"primary"}
        fullWidth
        disabled={isSubmitted}
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

export default ReplyForm;
