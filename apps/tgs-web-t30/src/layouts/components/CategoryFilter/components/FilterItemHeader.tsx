import React, { HTMLProps } from "react";
import styled from "styled-components";
import Icon from "@/components/project/Icon";
import iconProvider from "@/assets/t30/images/home/icon-provider.svg";
import iconCategory from "@/assets/t30/images/home/icon-category.svg";
import iconArrow from "@/assets/t30/images/home/icon-arrow.svg";
import { theme } from "@/theme";

const FilterItemHeaderContainer = styled.div`
  padding: 13px 12px;
  color: ${({ theme }) => theme.white};
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  width: 100%;
`;

const Title = styled.div``;

type Props = {
  drawerType: "provider" | "category";
  isOpen?: boolean;
} & HTMLProps<HTMLDivElement>;

const FilterItemHeader = ({ drawerType, isOpen, ...others }: Props) => {
  return (
    // @ts-ignore
    <FilterItemHeaderContainer
      {...others}
      style={{
        background: drawerType === "provider" ? theme.green : theme.main,
      }}
    >
      <Icon
        iconUrl={drawerType === "provider" ? iconProvider : iconCategory}
        width={"14px"}
        height={"14px"}
      />
      <Title>{drawerType === "provider" ? "Provider" : "Category"}</Title>
      <Icon
        iconUrl={iconArrow}
        width={"16px"}
        height={"16px"}
        style={{
          marginLeft: "auto",
          transform: isOpen ? "rotate(180deg)" : "rotate(0)",
        }}
      />
    </FilterItemHeaderContainer>
  );
};

export default FilterItemHeader;
