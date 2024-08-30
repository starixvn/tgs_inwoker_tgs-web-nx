import { Collapse } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import styled from "styled-components";
import { InboxMessage } from "@tgs-web-nx/types";
import { utility } from "@tgs-web-nx/utils";

const InboxItemContainer = styled.div`
  width: 100%;
  padding: 10px 30px;
  cursor: pointer;
  background: ${({ theme }) => theme.gray20};
`;

type CheckboxContainerProps = {
  $isEdit: boolean;
};
const CheckboxContainer = styled.div<CheckboxContainerProps>`
  float: left;
  width: 46px;
  height: 46px;
  margin: 56px 0 0 20px;

  ${({ $isEdit }: CheckboxContainerProps) => ($isEdit ? `display:block` : `display:none`)};
`;

const ContentContainer = styled.div`
  display: block;
  width: 90%;
`;

const ItemContainer = styled.div``;

type MsgTitleProps = {
  $isRead: boolean;
};
const MsgTitle = styled.div<MsgTitleProps>`
  font-size: 1.25rem;
  font-weight: ${({ $isRead }: MsgTitleProps) => ($isRead ? "400" : "600")};
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
  margin-bottom: 5px;
`;

const MsgTitleSpan = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const MsgDate = styled.div`
  font-size: 0.937rem;
  color: ${({ theme }) => theme.gray40};
`;

type CheckboxCircleProps = {
  checked: boolean;
  onClick: () => void;
};
const CheckboxCircle = styled.div<CheckboxCircleProps>`
  width: 46px;
  height: 46px;

  ${(props: CheckboxCircleProps) =>
    props.checked
      ? `background: url(${
        utility.imagePathGenerator("wapp/icon-inbox-checked.png")}) no-repeat;`
      : `border-radius: 23px;
    border: 2px solid #949494;`}
`;

const LetterContent = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  padding: 20px 0;
`;

type Props = {
  inboxMessage: InboxMessage;
  isEdit: boolean;
  handleCheckboxClick: (id: string, GUID: string) => void;
  isSelected: boolean;
  handleItemClick: (id: string) => void;
};

const InboxItem = ({
  inboxMessage,
  isEdit,
  handleCheckboxClick,
  isSelected,
  handleItemClick,
}: Props) => {
  const [opened, setOpened] = useState(false);
  const { id, isread, createon, subject, content, localization } = inboxMessage;

  const handleShowDetail = (isread: boolean) => {
    if (!opened && !isread) handleItemClick(inboxMessage.id);
    setOpened(!opened);
  };

  return (
    <InboxItemContainer>
      <CheckboxContainer $isEdit={isEdit}>
        <CheckboxCircle
          onClick={() => handleCheckboxClick(id, id.toString())}
          checked={isSelected}
        ></CheckboxCircle>
      </CheckboxContainer>

      <ItemContainer>
        <ContentContainer onClick={() => handleShowDetail(isread)}>
          <MsgTitle $isRead={isread}>
            <MsgTitleSpan>
              {localization !== null && localization.subject ? localization.subject : subject}
            </MsgTitleSpan>
          </MsgTitle>
          <MsgDate>{moment(createon).format("YYYY-MM-DD hh:mm a")}</MsgDate>
        </ContentContainer>

        <Collapse in={opened}>
          <LetterContent
            dangerouslySetInnerHTML={{
              __html:
                localization !== null && localization.content ? localization.content : content,
            }}
          />
        </Collapse>
      </ItemContainer>
    </InboxItemContainer>
  );
};

export default InboxItem;
