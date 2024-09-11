import Icon from "@/components/project/Icon";
import { GreenGradientButton } from "@/components/UI/Button";
import { useGoToHomePage } from "@/hooks/useGoToHomePage";
import { useWalletStore } from "@tgs-web-nx/core";
import { useAuthContext, useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { Common } from "@tgs-web-nx/utils";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 18rem;
  background-color: ${({ theme }) => theme.balanceHeaderBackground};
  border-radius: 1.2rem;
  justify-content: space-between;
  padding-right: .2rem;
`;

const BascicButton = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  height: 36px;
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  flex-shrink: 0;
`;

const BalanceContainer = styled(BascicButton)`
  cursor: unset;
  width: calc(100% - 3.8rem); 
  padding: 1rem .6rem;
  justify-content: flex-end;
  color: #FFC909;
`;

const WithDrawButton = styled(BascicButton)`
  background: ${({ theme }) => theme.memberSection};
  color: ${({ theme }) => theme.lightPurple};
  border: ${({ theme }) => `1px solid ${theme.lightPurple}`};
`;

const DepositButton = styled.div`
  color: ${({ theme }) => theme.text};
  margin-right: .1rem;
`;

const LogoutButton = styled(BascicButton)`
  background: ${({ theme }) => theme.inputBGC};
  color: ${({ theme }) => theme.text};
  gap: 4px;
`;

const AccountIcon = styled.div`
  cursor: pointer;
  margin-left: .6rem;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.2);
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

`;


const AccountHeaderContent = () => {
  const history = useHistory();
  const { wallet } = useWalletStore();
  const { handleLogout } = useAuthContext();
  const goToHomePage = useGoToHomePage();
  const { isLargeDesktopSize, isDesktopSize, isMobileSize } = useRwd();
  const { mainSymbol, mainWalletBalance, transferWalletBalance } = useUserWalletInfoContext();

  const currentBalance =
    mainSymbol + "$ " + Common.formatNumberWithThousand(mainWalletBalance + transferWalletBalance);
  const handleClickLogout = async () => {
    await handleLogout();
    goToHomePage();
  };

  return (
    <>
       <ButtonContainer>
        <BalanceContainer>{currentBalance}</BalanceContainer>

        <GreenGradientButton
          style={{minWidth: "unset", width: "3.6rem"}}
          onClick={() => {
            history.push("/deposit");
          }}
        >
          <Icon iconUrl="/assets/images/common/icon-plus.svg" width={"18px"} height={"18px"} />
        </GreenGradientButton>
        {/* {isMobileSize && <HeaderLanguageSwitch />}
        {isDesktopSize && (
          <>
            <WithDrawButton
              onClick={() => {
                history.push("/withdrawal");
              }}
            >
              {i18n.t("common.withdrawal").toUpperCase()}
            </WithDrawButton>
            <AccountIcon
              onClick={() => {
                history.push("/profile");
              }}
            >
              <img src={iconAccount} alt="profile" />
            </AccountIcon>
            <LogoutButton onClick={handleClickLogout}>
              {i18n.t("web.header.logout").toLocaleUpperCase()}
              <span>
                <img src={iconLogout} alt="logout" />
              </span>
            </LogoutButton>
          </>
        )} */}
      </ButtonContainer>
      <AccountIcon
        onClick={() => {
          history.push("/profile");
        }}
      >
        <img src={"/assets/images/common/avatar.png"} width={"36px"} height={"36px"} alt="profile" />
      </AccountIcon>
     
    </>
   
  );
};

export default AccountHeaderContent;
