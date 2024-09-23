import "./assets/fonts/inter/font.css";

import { media } from "@tgs-web-nx/constants";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
  }

  body {
    height: 100vh;
    overflow: hidden;
    margin: 0;
    background: ${({ theme }) => theme.mainBackground};
    background-size: 100%;
    font-family: Inter, sans-serif;
    font-size: 1rem;
    letter-spacing: 0.6px;
    padding-right: 0 !important;
  }

  #root {
    height: 100%;
    overflow: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }


  /* Custom scrollbar */

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
    background-color: ${({ theme }) => theme.scrollbarBackground};
  }

  ::-webkit-scrollbar {
    width: 0.6rem;
    height: 0.6rem;
    background-color: ${({ theme }) => theme.scrollbarBackground};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 1.6rem;
    background-color: ${({ theme }) => theme.scrollbarThumbBackground};
  }

  .main-container {
    padding-left: 0.8rem;
      padding-right: 0.8rem;

    ${media.sm} {
      padding-left: 1.6rem;
      padding-right: 1.6rem;
    }

    ${media.md} {
      padding-left: 3.2rem;
      padding-right: 3.2rem;
    }

    ${media.lg} {
      padding-left: 6.4rem;
      padding-right: 6.4rem;
    }

    @media screen and (min-width: 1700px){
      padding-left: 0;
      padding-right: 0;
    }
  }

`;
