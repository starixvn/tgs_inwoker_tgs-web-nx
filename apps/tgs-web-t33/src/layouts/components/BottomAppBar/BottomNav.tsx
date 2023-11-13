import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import { RouteCategoryEnum } from "@/router";
import { Button } from "@/components/UI/Button";
import { theme } from "@/theme";

export enum NavTypeEnum {
  ITEM,
  BIG_ITEM,
  MENU,
}

export type BottomNavItem = {
  navType: NavTypeEnum;
  label: string;
  routePath: string;
  routeCategory: RouteCategoryEnum;
};

type Props = {
  bottomNavItem: BottomNavItem;
  isSelected: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const BottomNav = ({ bottomNavItem }: Props) => {
  const { label } = bottomNavItem;
  return (
    <Button
      sx={{
        background: theme.primary,
        flex: 1,
        height: "100%",
      }}
    >
      {label}
    </Button>
  );
};

export default BottomNav;
