import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import AccountNavigations from "./components/AccountNavigations";
import InfoCard from "@/pages/account/components/InfoCard";
import i18n from "@/utils/i18n";
import { media } from "@/theme/breakpoints";
import UserWalletInfo from "@/components/project/UserWalletInfo";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import { useAuth } from "@/core/feature/useAuth";
import MemberCenterBorder from "@/pages/account/components/MemberCenterBorder";

const AccountContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  padding: 18px 0 0;
  max-width: 1200px;
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
