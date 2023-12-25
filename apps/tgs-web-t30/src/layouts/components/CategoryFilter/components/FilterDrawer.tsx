import React from "react";
import { Drawer } from "@mui/material";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const FilterDrawer = ({ isOpen, onClose, children }: Props) => {
  return (
    <Drawer
      anchor={"bottom"}
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiBackdrop-root": {
          background: "none",
        },
        "& .MuiPaper-root": {
          margin: "10px",
        },
      }}
    >
      {children}
    </Drawer>
  );
};

export default FilterDrawer;
