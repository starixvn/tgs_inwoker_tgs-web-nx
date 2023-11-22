import React from "react";
import { Button } from "@/components/UI/Button";
import { theme } from "@/theme";

type Props = {
  label: string;
  isSelected: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const BottomNav = ({ label, onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
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
