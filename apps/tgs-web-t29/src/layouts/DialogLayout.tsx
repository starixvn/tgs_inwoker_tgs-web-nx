import React, { useCallback } from "react";
import ReactDOM from 'react-dom';

import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { usePageName } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router-dom";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";
import { BOTTOM_APP_BAR_HEIGHT } from "@/theme/constants";
import DarkMemberMenu from "@/layouts/components/Header/components/ContextMenuButton/components/DarkMemberMenu";
import AccountDesktopLayout from "@/layouts/AccountDesktopLayout";
import DialogHeader, { DIALOG_HEADER_HEIGHT } from "@/components/UI/Dialog/DialogHeader";
import BottomAppBar from "@/layouts/components/BottomAppBar";
import { theme } from "@/theme";

const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
  overflow: auto;
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - ${DIALOG_HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});
  margin: ${`${DIALOG_HEADER_HEIGHT} auto ${BOTTOM_APP_BAR_HEIGHT}`};
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  position: fixed;
  top: 50px;
  z-index: 500;
  background: ${({ theme }) => theme.mainBackground};
`;

type Props = {
  children: React.ReactNode;
};
const DialogLayout = ({ children }: Props) => {
  const { isDesktopSize } = useRwd();
  const { pageName } = usePageName();
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    history.goBack();
  }, [history]);

  if (isDesktopSize) {
    return <AccountDesktopLayout>{children}</AccountDesktopLayout>;
  }
  

  return (
    <DialogLayoutContainer>
      <DialogHeader handleClose={handleCloseDialog} dialogHeaderTitle={pageName} />
      {/* <FilterContainer>
        <TextField
          // value={subject}
          // onChange={updateSubject}
          placeholder="玩家用户名"
          sx={{
            input: {
              width: isDesktopSize ? "400px" : "300px",
            },
          }}
        />
        <Select defaultValue={"status"} sx={{ width: "200px" }}>
          <MenuItem value={"status"}>{i18n.t("agent.status")} </MenuItem>
          <MenuItem value={"enabled"}>{i18n.t("agent.enabled")} </MenuItem>
          <MenuItem value={"disabled"}>{i18n.t("agent.disabled")} </MenuItem>
          <MenuItem value={"inBlacklist"}>{i18n.t("agent.inBlacklist")} </MenuItem>
        </Select>
        {isDesktopSize && (
          <Button
            variant={"outlined"}
            sx={{
              width: "100px",
              color: theme.white,
              background: theme.primary,
              "&:hover": {
                color: theme.white,
                background: theme.primary,
              },
            }}
          >
            {i18n.t("common.search")}
          </Button>
        )}
      </FilterContainer> */}

      <ContentWrapper>
        {isDesktopSize && (
          <DarkMemberMenu
            handleCloseContextMenu={() => {}}
            style={{ width: "222px", margin: "22px 0 0 22px", flexShrink: 0, minHeight: "800px" }}
          />
        )}
        {children}
      </ContentWrapper>

      <BottomAppBar />
    </DialogLayoutContainer>
  );
};

export default DialogLayout;
