import { FormControl, ItemContainer, LabelContainer } from "@/components/styled-component/ProfileForms";
import { GreenGradientButton } from "@/components/UI/Button";
import { TextArea } from "@/components/UI/TextArea";
import { TextField } from "@/components/UI/TextField";
import ConfirmDialog from "@/pages/inbox/components/dialog/ConfirmDialog";
import { useConfirmDialog } from "@tgs-web-nx/core/features";
import { InboxItemDetail, ReplyInboxItemReqDto } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

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
  border: ${({ theme }) => `1px solid ${theme.secBTNBGC}`};
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
      <ItemContainer>
        <LabelContainer>{i18n.t("subject")}</LabelContainer>
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
      </ItemContainer>

      <ItemContainer>
        <LabelContainer>{i18n.t("yourmessage")}</LabelContainer>
        <TextArea
          value={message}
          onChange={updateMessage}
          placeholder={`${i18n.t("pleaseenter")}${`${i18n.t("yourmessage")}`.toLowerCase()}`}
        />
      </ItemContainer>

      <InputWrapper>
        <Label>{i18n.t("originalmessage")}</Label>
        <OriginalMessage>{content}</OriginalMessage>
      </InputWrapper>

      <GreenGradientButton
        onClick={handleSubmit}
        variant={"contained"}
        color={"primary"}
        fullWidth
        disabled={isSubmitted}
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

export default ReplyForm;
