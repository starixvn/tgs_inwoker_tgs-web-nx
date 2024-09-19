import BG from "@/assets/t29/images/loginBG.png";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { styled as muiStyled } from "@mui/material";
import Tab from "@mui/material/Tab";
import { media } from "@tgs-web-nx/constants";
import styled from "styled-components";

export const AuthFormContainer = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin-top: 1.2rem;

  ::-webkit-scrollbar {
    visibility: hidden;
    width: 0;
  }

  & > * {
    flex-shrink: 0;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  margin: 0 auto 2rem;
`;

export const FormContainerWithBG = styled.div`
  height: 100%;
  background: url(${BG}) no-repeat center center;
`;

export const MainWrapper = styled.div`
  ${media.sm} {
    display: grid;
    grid-template-columns: 32.5rem 1fr;
    grid-template-rows: 54.8rem;
  }
`;

export const CustomTabList = muiStyled(TabList)(({ theme }) => ({
  width: "60%",
  minWidth: "20rem",
  background: theme.palette.authForm.tabsBackground,
  borderRadius: "1rem",
  padding: "0.4rem",
  minHeight: "4.4rem",
  margin: "1.6rem 2.4rem 0",
  [theme.breakpoints.up("sm")]: {
    marginTop: "6.6rem",
  },
  ".MuiTabs-indicator": { display: "none" },
}));

export const CustomTab = muiStyled(Tab)(({ theme }) => ({
  color: theme.palette.authForm.tabColor,
  fontFamily: "inherit",
  fontSize: "1.4rem",
  fontWeight: "700",
  lineHeight: "3.6rem",
  minHeight: "3.6rem",
  padding: "0 1.6rem",
  borderRadius: "1rem",
  flexGrow: "1",
  textTransform: "capitalize",

  "&.Mui-selected": {
    background: theme.palette.authForm.activeTabBackground,
    color: theme.palette.authForm.activeTabColor,
  },
}));

export const CustomTabPanel = muiStyled(TabPanel)(({ theme }) => ({
  padding: 0,
}));
