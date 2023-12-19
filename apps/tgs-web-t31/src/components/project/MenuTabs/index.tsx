// import React from "react";
// import styled from "styled-components";
import { Tab, Tabs, styled as muiStyled } from "@mui/material";
import { useLocation } from "react-router";
import { useHistory } from "react-router";
import { NavCardKey } from "@tgs-web-nx/types";
import { useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import { theme } from "@/theme";

const MenuTabs = () => {
  const { accountNavItemList } = useGetNavItemList();
  const history = useHistory();
  const StyledTab = muiStyled(Tab)(({ theme }) => ({
    color: theme.palette.white50,
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "16px",
    letterSpacing: "0em",
    textAlign: "center",
  }));
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const currentRoute = pathSegments[pathSegments.length - 1];
  return (
    <Tabs
      variant="fullWidth"
      sx={{ color: "white" }}
      value={`/${currentRoute}`}
      onChange={(event, value) => {
        history.push(value);
      }}
    >
      {accountNavItemList.map((item) => {
        if (item.key === NavCardKey.VIP) {
          return;
        }
        return (
          <StyledTab
            iconPosition="start"
            icon={<img src={item.iconUrl} alt="icon" />}
            key={item.key}
            label={item.label}
            value={item.routePath}
            sx={{
              "&.Mui-selected": {
                backgroundColor: theme.accountLableText,
                color: theme.text,
              },
            }}
          />
        );
      })}
    </Tabs>
  );
};

export default MenuTabs;
