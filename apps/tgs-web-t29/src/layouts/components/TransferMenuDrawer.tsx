import React, { useCallback, useMemo } from "react";
import { Drawer } from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import config, { mapBrandName, brandConfig } from "@tgs-web-nx/config";
import { theme } from "@/theme";
import { BOTTOM_APP_BAR_HEIGHT } from "@/theme/constants";
import { Button } from "@/components/UI/Button";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  gap: 10px;

  & > * {
    flex: 1;
  }
`;

interface TransferButton {
  key: string;
  label: string | any;
  background: string;
  routePath: string;
}

type Props = {
  isOpen: boolean;
  handleDrawerToggle: (isOpen?: boolean) => void;
};
const TransferMenuDrawer = ({ isOpen, handleDrawerToggle }: Props) => {
  const history = useHistory();
  const isHideTransferButton = brandConfig[mapBrandName(config.brand)].isHideTransferButton;

  const handleDialogClose = () => {
    handleDrawerToggle(false);
  };

  const handleButtonClick = (transferButton: TransferButton, routePath: string) => {
    handleDrawerToggle(false);
    if (transferButton.key === "agent") {
      handleGotoAgentAdmin();
    } else {
      history.push(routePath);
    }
  };

  const handleGotoAgentAdmin = useCallback(() => {
    if (config.AgentAdminUrl) {
      window.open(config.AgentAdminUrl, "_blank");
    }
  }, []);

  const transferButtonList = useMemo<TransferButton[]>(() => {
    return [
      {
        key: "transfer",
        label: i18n.t("common.transfer"),
        background: theme.blueBtn,
        routePath: "/transfer",
      },
      {
        key: "deposit",
        label: i18n.t("common.deposit"),
        background: theme.green,
        routePath: "/deposit",
      },
      {
        key: "withdraw",
        label: i18n.t("common.withdrawal"),
        background: theme.primary,
        routePath: "/withdrawal",
      },
    ];
  }, []);

  return (
    <Drawer
      variant={"temporary"}
      anchor={"bottom"}
      open={isOpen}
      onClose={handleDialogClose}
      sx={{
        flexShrink: 0,
        height: `calc(100vh - ${BOTTOM_APP_BAR_HEIGHT})`,
        zIndex: "999",
        "& .MuiBackdrop-root": {
          height: `calc(100vh - ${BOTTOM_APP_BAR_HEIGHT})`,
          marginBottom: BOTTOM_APP_BAR_HEIGHT,
        },
        "& .MuiDrawer-paper": {
          height: "72px",
          marginBottom: BOTTOM_APP_BAR_HEIGHT,
          transition: "all ease-in-out 0.2s",
          border: "none",
          background: theme.mainBackground,
        },
      }}
    >
      <ButtonContainer>
        {transferButtonList
          .filter((transferButton) => {
            if (isHideTransferButton) {
              return transferButton.key !== "transfer";
            } else {
              return transferButton;
            }
          })
          .map((transferButton) => {
            const { key, label, background, routePath } = transferButton;
            return (
              <Button
                key={key}
                onClick={() => handleButtonClick(transferButton, routePath)}
                sx={{
                  background,
                  borderRadius: "4px",
                }}
              >
                {label}
              </Button>
            );
          })}
      </ButtonContainer>
    </Drawer>
  );
};

export default TransferMenuDrawer;
