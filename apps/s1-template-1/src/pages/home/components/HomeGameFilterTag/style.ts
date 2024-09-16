import { media } from "@tgs-web-nx/constants";
import styled from "styled-components";

export const FilterTagWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 1.2rem;

  ${media.sm} {
    justify-content: flex-end;
  }
`;

export const SearchInputWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  gap: 10px;

  ${media.sm} {
    width: 410px;
    height: 100%;
  }
`;

export const CommonSearchWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.6rem;

  .multi-select {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 3.6rem;
    padding: 0px var(--spacing-sm, 8px);
    border-radius: 1rem;
    border: none;
    background: #1c2532;

    ${media.sm} {
      width: 20rem;
    }

    &:not(.p-disabled):hover,
    &:not(.p-disabled).p-focus {
      border: none;
      box-shadow: none;
    }

    .p-multiselect-label {
      font-size: 1.4rem;
      font-weight: 700;
    }

    .p-multiselect-trigger {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      width: 24px;
      height: 24px;
      padding: var(--spacing-sm, 8px);
      border-radius: 6px;
      background: #253144;

      .p-icon {
        color: #6e7e92;
        transform: scale(1.5);
      }
    }
  }

  .p-dropdown {
    height: 3.6rem;
    padding: 0px var(--spacing-sm, 8px);
    border-radius: 1rem;
    border: none;
    background: #1c2532;

    ${media.sm} {
      width: 20rem;
    }

    &:not(.p-disabled):hover,
    &:not(.p-disabled).p-focus {
      box-shadow: none;
      border: none;
    }

    .p-inputtext {
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      font-weight: 700;
      color: #fff;
    }

    .p-dropdown-trigger {
      position: relative;
      top: 0.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      width: 24px;
      height: 24px;
      padding: var(--spacing-sm, 8px);
      border-radius: 6px;
      background: #253144;

      .p-icon {
        color: #6e7e92;
        transform: scale(1.5);
      }
    }
  }

  ${media.sm} {
    display: flex;
    justify-content: flex-end;
  }
`;
