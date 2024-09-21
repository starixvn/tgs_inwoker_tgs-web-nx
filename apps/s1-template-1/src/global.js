import "./assets/fonts/inter/font.css";

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
    background: ${({ theme }) => theme.body};
    background-size: 100%;
    font-family: Inter, sans-serif;
    font-size: 1rem;

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

`;
