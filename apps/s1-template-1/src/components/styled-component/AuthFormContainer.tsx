import BG from "@/assets/t29/images/loginBG.png";
import { media } from "@tgs-web-nx/constants";
import styled from "styled-components";

export const AuthFormContainer = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;

  ::-webkit-scrollbar {
    visibility: hidden;
    width: 0;
  }

  ${media.sm} {
    margin-top: 4.8rem;
  }

  & > * {
    flex-shrink: 0;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  margin: 0 auto 2rem;
`;

export const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 3.6rem;
  align-items: center;
  width: 50%;
  min-width: 20rem;
  padding: 0.4rem;
  margin: 1.6rem 2.4rem 1.2rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.authTabsBackground};
  text-align: center;
`;

export const ActiveTab = styled.div`
  height: 3.6rem;
  font-size: 1.3rem;
  font-weight: 700;
  border-radius: 10px;
  background: ${({ theme }) => theme.authActiveTabBackground};
  padding: 0 2rem;
  line-height: 3.6rem;
  color: ${({ theme }) => theme.authActiveTabColor};
`;

export const TabText = styled.span`
  height: 3.6rem;
  font-size: 1.3rem;
  font-weight: 700;
  padding: 0 2rem;
  line-height: 3.6rem;
  color: ${({ theme }) => theme.authTabColor};
  cursor: pointer;
`;

export const FormContainerWithBG = styled.div`
  height: 100%;
  background: url(${BG}) no-repeat center center;
`;
