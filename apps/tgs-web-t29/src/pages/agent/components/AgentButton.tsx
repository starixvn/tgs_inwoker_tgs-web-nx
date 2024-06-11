import { Button, SxProps, Theme } from "@mui/material"
import { ReactNode } from "react"
import { theme } from "@/theme"

type Props = {
    sx?: SxProps<Theme>,
    onClick?: () => void,
    disabled?: boolean,
    children: ReactNode
}

export const AgentButton = ({
    sx,
    onClick,
    disabled,
    children
}: Props) => {
    return (
        <Button
            variant={"outlined"}
            sx={{
              width: "100px",
              color: theme.white,
              background: theme.primary,
              "&:hover": {
                color: theme.white,
                background: theme.primary,
              },
              "&.Mui-disabled": {
                background: theme.gray10,
              },
              ...sx
            }}
            onClick={onClick}
            disabled={disabled}
          >
            {children}
          </Button>
    )
}