import RegisterForm from "@/components/project/auth/RegisterForm";
import { CustomTab, CustomTabList, CustomTabPanel, MainWrapper } from "@/components/styled-component/AuthFormContainer";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import AuthBanner from "@/components/UI/Dialog/AuthDialog/components/AuthBanner";
import AuthCommunity from "@/components/UI/Dialog/AuthDialog/components/AuthCommunity";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import { useDetectDialogClose } from "@tgs-web-nx/core/hooks";
import React, { useState } from "react";

import LoginForm from "../LoginForm";

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
                <CustomTab label="Sign In" value="1" />
                <CustomTab label="Sign Up" value="2" />
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
