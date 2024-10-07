import RegisterForm from "@/components/project/auth/RegisterForm";
import {
  CustomTab,
  CustomTabList,
  CustomTabPanel,
  MainWrapper,
} from "@/components/styled-component/AuthFormContainer";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import AuthBanner from "@/components/UI/Dialog/AuthDialog/components/AuthBanner";
import AuthCommunity from "@/components/UI/Dialog/AuthDialog/components/AuthCommunity";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import { useDetectDialogClose } from "@tgs-web-nx/core/hooks";
import { SignInSignUpTabEnum } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import React, { useEffect, useState } from "react";

import LoginForm from "../LoginForm";

const RegisterDialog = () => {
  const [value, setValue] = useState(SignInSignUpTabEnum.SignUp);
  const { isRegisterDialogOpen, handleToggleRegisterDialog, tabValue, handleChangeTabValue } =
    useAuthDialog();
  useDetectDialogClose(isRegisterDialogOpen, () => handleToggleRegisterDialog(false));

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    handleChangeTabValue(newValue);
  };

  useEffect(() => {
    setValue(tabValue);
  }, [tabValue]);

  return (
    <AuthDialog open={isRegisterDialogOpen} onClose={() => handleToggleRegisterDialog(false)}>
      <MainWrapper>
        <AuthBanner />

        <div>
          <TabContext value={value}>
            <Box>
              <CustomTabList onChange={handleChange} aria-label="Sign Up">
                <CustomTab label={i18n.t("web.login.signin")} value={SignInSignUpTabEnum.SignIn} />
                <CustomTab
                  label={i18n.t("web.register.signup")}
                  value={SignInSignUpTabEnum.SignUp}
                />
              </CustomTabList>
            </Box>
            <AuthCommunity />
            <CustomTabPanel value={SignInSignUpTabEnum.SignIn}>
              <LoginForm />
            </CustomTabPanel>
            <CustomTabPanel value={SignInSignUpTabEnum.SignUp}>
              <RegisterForm />
            </CustomTabPanel>
          </TabContext>
        </div>
      </MainWrapper>
    </AuthDialog>
  );
};

export default RegisterDialog;
