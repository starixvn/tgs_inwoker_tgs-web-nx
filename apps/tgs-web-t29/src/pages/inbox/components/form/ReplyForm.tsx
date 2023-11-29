import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { InboxItemDetail, ReplyInboxItemReqDto } from "@tgs-web-nx/types";
import { TextField } from "@/components/UI/TextField";
import { FormControl, SubmitButton } from "@/components/styled-component/ProfileForms";
import { TextArea } from "@/components/UI/TextArea";

const InboxComposeFormContainer = styled.div`
  padding: 16px;
`;
const InputWrapper = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.h6`
  color: #23507d;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 16px;
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

  const handleClickSubmit = useCallback(async () => {
    await handleSubmitReply({ letterId: inboxItemDetail.id, content: message });
  }, [handleSubmitReply, inboxItemDetail.id, message]);

  return (
    <InboxComposeFormContainer>
      <InputWrapper>
        <Label>{i18n.t("subject")}</Label>
        <FormControl variant="outlined">
          <TextField
            value={displayedSubject}
            sx={{
              input: {
                padding: "17px 0",
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
        <TextArea value={content} disabled={true} />
      </InputWrapper>

      <SubmitButton onClick={handleClickSubmit} variant={"contained"} color={"primary"} fullWidth>
        {i18n.t("common.submit")}
      </SubmitButton>
    </InboxComposeFormContainer>
  );
};

export default ReplyForm;
