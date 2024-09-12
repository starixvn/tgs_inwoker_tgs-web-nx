import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import { useDetectDialogClose } from "@tgs-web-nx/core/hooks";
import React, { useState } from "react";

import { i18n } from "@tgs-web-nx/utils";
import LoginForm from "../LoginForm";
import AuthCommunity from "@/components/UI/Dialog/AuthDialog/components/AuthCommunity";
import AuthBanner from "@/components/UI/Dialog/AuthDialog/components/AuthBanner";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import {
  CustomTab,
  CustomTabList,
  CustomTabPanel,
  MainWrapper,
} from "@/components/styled-component/AuthFormContainer";
import RegisterForm from "@/components/project/auth/RegisterForm";

const RegisterDialog = () => {
  const [value, setValue] = useState("2");
  const { isRegisterDialogOpen, handleToggleRegisterDialog } = useAuthDialog();
  useDetectDialogClose(isRegisterDialogOpen, () => handleToggleRegisterDialog(false));

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <AuthDialog open={isRegisterDialogOpen} onClose={() => handleToggleRegisterDialog(false)}>
      <MainWrapper>
        <AuthBanner />

        <div>
          <TabContext value={value}>
            <Box>
              <CustomTabList onChange={handleChange} aria-label="Sign Up">
                <CustomTab label={i18n.t("web.login.signin")} value="1" />
                <CustomTab label={i18n.t("web.register.signup")} value="2" />
              </CustomTabList>
            </Box>
            <AuthCommunity />
            <CustomTabPanel value="1">
              <LoginForm />
            </CustomTabPanel>
            <CustomTabPanel value="2">
              <RegisterForm />
            </CustomTabPanel>
          </TabContext>
        </div>
      </MainWrapper>
    </AuthDialog>
  );
};

export default RegisterDialog;
