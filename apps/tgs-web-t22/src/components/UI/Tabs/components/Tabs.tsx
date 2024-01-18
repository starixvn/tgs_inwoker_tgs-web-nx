import { Tabs as MuiTabs, Tab as MuiTab } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";

export const Tabs = muiStyled(MuiTabs)(({ theme }) => ({
    borderRadius: '8px', 
    border: '1px #9A604C solid',
    background: theme.palette.lightBlack,
    minHeight: 'unset',

    ".MuiTabs-indicator": {
      display: "none",
    },
}));

export const Tab = muiStyled(MuiTab)(({ theme }) => ({
    padding: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    minHeight: 'unset',
    fontSize: "1.2rem",
    fontWeight: 400,
    textTransform: "uppercase",
    color: theme.palette.labelText,

    "&.Mui-selected": {
        background: theme.palette.activeTab,
        color: theme.palette.white,
    },
}));