import UserWalletInfo from "@/components/project/UserWalletInfo";
import { useAuth } from "@/core/feature/useAuth";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import { useRwd } from "@/core/hooks/tools/useRwd";
import InfoCard from "@/pages/account/components/InfoCard";
import MemberCenterBorder from "@/pages/account/components/MemberCenterBorder";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import i18n from "@/utils/i18n";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AccountNavigations from "./components/AccountNavigations";

const AccountContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  padding: 18px 0 0;
  max-width: ${MAIN_CONTENT_MAX_WIDTH};
  margin: auto;

  & > div {
    margin-bottom: 15px;
  }

  ${media.sm} {
    & > div {
      margin-bottom: 20px;
    }
  }
`;

const Mine = () => {
  useUpdatePageName(i18n.t("TIGER.my"));

  const { isLogin } = useAuth();
  const history = useHistory();
  const { isDesktopSize } = useRwd();

  useEffect(() => {
    if (!isLogin) {
      history.push("/login");
    }
  }, []);

  return (
    <AccountContainer>
      {isDesktopSize ? <UserWalletInfo /> : <InfoCard style={{ marginBottom: "50px" }} />}
      {!isDesktopSize && <MemberCenterBorder />}
      <AccountNavigations />
    </AccountContainer>
  );
};

export default Mine;
