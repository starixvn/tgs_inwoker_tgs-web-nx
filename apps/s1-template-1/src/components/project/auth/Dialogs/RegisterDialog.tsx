import RegisterForm from "@/components/project/auth/RegisterForm";
import { CustomTab, CustomTabList, CustomTabPanel, MainWrapper } from "@/components/styled-component/AuthFormContainer";
import AuthDialog from "@/components/UI/Dialog/AuthDialog/AuthDialog";
import AuthBanner from "@/components/UI/Dialog/AuthDialog/components/AuthBanner";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import { media } from "@tgs-web-nx/constants";
import { useAuthDialog } from "@tgs-web-nx/core/features";
import { useDetectDialogClose } from "@tgs-web-nx/core/hooks";
import React, { useState } from "react";
import styled from "styled-components";

import LoginForm from "../LoginForm";

const Wrapper = styled.div`
  ${media.sm} {
    display: grid;
    grid-template-columns: 32.5rem 1fr;
    grid-template-rows: 54.8rem;
  }
`;

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
