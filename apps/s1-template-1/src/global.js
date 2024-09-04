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
    margin: 0;
    background: ${({ theme }) => theme.body};
    background-size: 100%;
    font-family: Inter, Arial, sans-serif;
    font-size: 1rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  .headerSubmenu .slick-track,
  .headerSubmenu .slick-slider .slick-list {
    height: auto;
  }

  .headerSubmenu .slick-slide > div {
    display: flex;
    align-items: center;
  }

  .headerSubmenu .slick-prev {
    left: 0;
    top: 90px;
  }

  .headerSubmenu .slick-next {
    right: 0;
    top: 90px;
  }
  .headerSubmenu.slick-slider .slick-track,
  .headerSubmenu.slick-slider .slick-list {
    margin-left: 25px;
    margin-right: 35px;
  }

  .headerSubmenu .slick-prev::before,
  .headerSubmenu .slick-next::before {
    color: ${({ theme }) => theme.primary};
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
