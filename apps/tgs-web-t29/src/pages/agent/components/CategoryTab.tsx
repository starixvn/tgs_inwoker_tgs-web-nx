import React, { useEffect, useState } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { Button } from "@mui/material";
import { AgentCategoryTab, useAgentPage } from "@tgs-web-nx/core/hooks";
import { theme } from "@/theme";

type Props = {
    category: AgentCategoryTab
    selected: boolean
    handleClickTab: (category: AgentCategoryTab) => void
}
const CategoryTab = (props: Props) => {
    const { category, selected, handleClickTab } = props
    return (
        <Button
            onClick={() => {
                handleClickTab(category)
            }}
            sx={{
                color: selected ? theme.white : theme.text,
                background: selected ? theme.blue40 : theme.blue20,
                "&:hover": {
                    color: theme.white,
                    background: theme.blue40
                },
                whiteSpace: {
                    sx: "wrap",
                    sm: "no-wrap",
                },
                padding: "12px",
                borderRadius: "4px",
                width: {
                    xs: "calc((100% - 2 * 9px) / 3)",
                    sm: "auto",
                },
                minWidth: {
                    sm: "calc((100% - 5 * 9px) / 6)",
                },
            }}
        >
            {category.label}
        </Button>
    )

}

export default CategoryTab