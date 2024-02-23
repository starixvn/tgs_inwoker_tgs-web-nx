import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { InboxItemDetail, ReplyInboxItemReqDto } from "@tgs-web-nx/types";
import { useConfirmDialog } from "@tgs-web-nx/core/features";
import { TextField } from "@/components/UI/TextField";
import { FormControl, SubmitButton } from "@/components/styled-component/ProfileForms";
import { TextArea } from "@/components/UI/TextArea";
import ConfirmDialog from "@/pages/inbox/components/dialog/ConfirmDialog";
import { media } from "@/theme/breakpoints";

const InboxComposeFormContainer = styled.div`
  padding: 16px 10px;
`;
const InputWrapper = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.h6`
  color: ${({ theme }) => theme.white};
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 16px;
`;

const OriginalMessage = styled.div`
  max-height: 120px;
  white-space: pre-line;
  border: ${({ theme }) => `1px solid ${theme.tertiary}`};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.primaryDark};
  ${media.sm} {
    background-color: ${({ theme }) => theme.primaryLight};
  }
  color: ${({ theme }) => theme.text};
  overflow: auto;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0em;
  padding: 10px 20px;
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
              input: {
                padding: "17px 20px",
              },
            }}
            disabled={true}
          />
        </FormControl>
      </InputWrapper>

      <InputWrapper>
        <Label>{i18n.t("yourmessage")}</Label>
        <TextArea
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
