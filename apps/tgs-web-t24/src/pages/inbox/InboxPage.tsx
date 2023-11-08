import iconInbox from "@/assets/t23/images/badge/icon-inbox.svg";
import AccountPaper from "@/components/project/AccountPaper";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import Inbox from "@/core/components/Inbox";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import i18n from "@/utils/i18n";
import styled from "styled-components";

const InboxContainer = styled.div`
  padding: 0 22px;
  max-width: calc(${MAIN_CONTENT_MAX_WIDTH} + 22px * 2);
  margin: auto;
`;

const InboxPage = () => {
  useUpdatePageName(i18n.t("inbox.title"));

  const { isDesktopSize } = useRwd();

  return (
    <InboxContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper pageName={i18n.t("inbox.title")} iconUrl={iconInbox}>
        <Inbox />
      </AccountPaper>
    </InboxContainer>
  );
};

export default InboxPage;
