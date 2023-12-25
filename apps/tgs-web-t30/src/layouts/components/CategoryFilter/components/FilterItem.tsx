import styled from "styled-components";
import { theme } from "@/theme";

type FilterItemProps = {
  $isActive: boolean;
  theme: typeof theme;
};
export const FilterItem = styled.div<FilterItemProps>`
  background: ${({ theme }) => theme.mainLightBackground};
  border: 1px solid
    ${({ $isActive, theme }: FilterItemProps) => ($isActive ? "#91C538" : theme.mainBackground)};

  width: 50%;
  padding: 12px;
  color: ${({ theme }) => theme.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export const FilterItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
