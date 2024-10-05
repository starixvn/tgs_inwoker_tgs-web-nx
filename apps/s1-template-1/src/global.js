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
    padding-left: ${({ theme }) => theme.mainContainerSpace};
    padding-right: ${({ theme }) => theme.mainContainerSpace};

    ${media.xs} {
      padding-left: ${({ theme }) => theme.mainContainerSpaceXs};
      padding-right:${({ theme }) => theme.mainContainerSpaceXs};
    }

    ${media.sm} {
      padding-left: ${({ theme }) => theme.mainContainerSpaceSm};
      padding-right:${({ theme }) => theme.mainContainerSpaceSm};
    }

    ${media.md} {
      padding-left: ${({ theme }) => theme.mainContainerSpaceMd};
      padding-right: ${({ theme }) => theme.mainContainerSpaceMd};
    }

    ${media.lg} {
      padding-left: ${({ theme }) => theme.mainContainerSpaceLg};
      padding-right: ${({ theme }) => theme.mainContainerSpaceLg};
    }

    @media screen and (min-width: 1700px){
      padding-left: ${({ theme }) => theme.mainContainerFullWidthSpace};
      padding-right: ${({ theme }) => theme.mainContainerFullWidthSpace};
    }
  }

  // customize multiple select
.p-multiselect-panel {
  padding: 0.8rem;
  margin-top: 0.1rem;
  background: ${({ theme }) => theme.multipleSelectPanelBackground};
  color: ${({ theme }) => theme.multipleSelectPanelColor};
  border: 0 none;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.multipleSelectPanelShadow};
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
  border-color: ${({ theme }) => theme.multipleSelectCheckboxBorderChecked};
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
  background: ${({ theme }) => theme.multipleSelectItemBackgroundHighlight};
}

.p-multiselect-panel .p-multiselect-items .p-multiselect-item.p-highlight,
.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
  color: ${({ theme }) => theme.multipleSelectItemColorHighlight};
  background: ${({ theme }) => theme.multipleSelectItemBackgroundHighlight};
}

.p-multiselect-panel
  .p-multiselect-items
  .p-multiselect-item:not(.p-highlight):not(.p-disabled).p-focus,
.p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled).p-focus {
  color: ${({ theme }) => theme.multipleSelectItemColorHighlight};
  background: transparent;
}

.p-dropdown-panel {
  padding: 0.8rem;
  margin-top: 0.1rem;
  background: ${({ theme }) => theme.multipleSelectPanelBackground};
  color: ${({ theme }) => theme.multipleSelectPanelColor};
  border: 0 none;
  border-radius: 1rem;
  box-shadow: 0 0.2rem 1.2rem 0 rgba(0, 0, 0, 0.1);
}


`;
