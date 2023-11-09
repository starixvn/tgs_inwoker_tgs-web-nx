import React from "react";
import styled from "styled-components";
import { InboxMessage } from "@/core/types/stores/account";
import InboxItem from "@/pages/inbox/components/InboxItem";

const InboxListContainer = styled.div`
  & > div {
    margin-bottom: 10px;
  }
`;

type Props = {
  inboxMessageList: InboxMessage[];
  selectedIds: string[];
  isEdit: boolean;
  handleCheckboxClick: (subjectID: string, guid: string) => void;
  handleItemClick: (id: string) => void;
};
const MobileInboxList = ({
  inboxMessageList,
  selectedIds,
  isEdit,
  handleCheckboxClick,
  handleItemClick,
}: Props) => {
  return (
    <InboxListContainer>
      {inboxMessageList.map((inboxMessage: InboxMessage, index: number) => {
        return (
          <InboxItem
            key={index}
            inboxMessage={inboxMessage}
            isSelected={selectedIds.includes(inboxMessage.id)}
            isEdit={isEdit}
            handleCheckboxClick={handleCheckboxClick}
            handleItemClick={handleItemClick}
          />
        );
      })}
    </InboxListContainer>
  );
};

export default MobileInboxList;
