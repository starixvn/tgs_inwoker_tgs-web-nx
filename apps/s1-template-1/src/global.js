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
    height: 100%;
    overflow: hidden;
    margin: 0;
    background: ${({ theme }) => theme.mainBackground};
    background-size: 100%;
    font-family: var(--main-font-family);
    font-feature-settings: normal !important;
    font-size: 1rem;
    letter-spacing: 0.6px;
    padding-right: 0 !important;
  }

  #root {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
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

    ${media.xs} {
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

  // customize multiple select
.p-multiselect-panel {
  padding: 0.8rem;
  margin-top: 0.1rem;
  background: ${({ theme }) => theme.multipleSelectBackground};
  color: ${({ theme }) => theme.multipleSelectColor};
  border: 0 none;
  border-radius: 1rem;
  box-shadow: 0 0.2rem 1.2rem 0 ${({ theme }) => theme.multipleSelectShadow};
}

.p-multiselect-items-wrapper {
  max-height: 32rem !important;
}

.p-multiselect-panel .p-multiselect-header {
  display: none;
}

.p-multiselect-items {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.p-checkbox .p-checkbox-box {
  width: 2rem;
  height: 2rem;
  border: 2px solid ${({ theme }) => theme.multipleSelectCheckboxBorder};
  background: ${({ theme }) => theme.multipleSelectCheckboxBackground};
}

.p-checkbox.p-highlight .p-checkbox-box {
  border-color: ${({ theme }) => theme.multipleSelectCheckboxChecked};
  background: ${({ theme }) => theme.multipleSelectCheckboxChecked};
}

.p-multiselect-checkbox {
  position: relative;
  top: 0.2rem;
  margin-right: 0.8rem;
}

.p-multiselect-panel .p-multiselect-items .p-multiselect-item,
.p-dropdown-panel .p-dropdown-items .p-dropdown-item {
  min-height: 4.4rem;
  padding: 0.8rem;
  font-size: 1.4rem;
  font-weight: 700;
  border-radius: 1rem;
}

.p-multiselect-panel .p-multiselect-items .p-multiselect-item.p-highlight.p-focus {
  background: ${({ theme }) => theme.dropdownItemBackgroundHighlight};
}

.p-multiselect-panel .p-multiselect-items .p-multiselect-item.p-highlight,
.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
  color: ${({ theme }) => theme.dropdownItemColorHighlight};
  background: ${({ theme }) => theme.dropdownItemBackgroundHighlight};
}

.p-multiselect-panel
  .p-multiselect-items
  .p-multiselect-item:not(.p-highlight):not(.p-disabled).p-focus,
.p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled).p-focus {
  color: ${({ theme }) => theme.dropdownItemColorHighlight};
  background: transparent;
}

.p-dropdown-panel {
  padding: 0.8rem;
  margin-top: 0.1rem;
  background: ${({ theme }) => theme.dropdownBackground};
  color: ${({ theme }) => theme.dropdownColor};
  border: 0 none;
  border-radius: 1rem;
  box-shadow: 0 0.2rem 1.2rem 0 rgba(0, 0, 0, 0.1);
}


`;
