import { Button } from "@mui/material";
import { AgentCategoryTab, useRwd } from "@tgs-web-nx/core/hooks";
import styled from "styled-components";
import { useHistory } from "react-router";
import { theme } from "@/theme";
import Icon from "@/components/project/Icon";
import iconArrow from "@/assets/t29/images/profile/icon-arrow.svg";

type Props = {
  category: AgentCategoryTab;
  selected: boolean;
  handleClickTab: (category: AgentCategoryTab) => void;
};

const MobileTab = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.blue20};
  color: ${({ theme }) => theme.text};
  padding: 20px;
`;
const CategoryTab = (props: Props) => {
  const { category, selected, handleClickTab } = props;
  const { isDesktopSize } = useRwd();
  const history = useHistory();

  return isDesktopSize ? (
    <Button
      onClick={() => {
        handleClickTab(category);
      }}
      sx={{
        color: selected ? theme.white : theme.text,
        background: selected ? theme.blue40 : theme.blue20,
        "&:hover": {
          color: theme.white,
          background: theme.blue40,
        },
        whiteSpace: "no-wrap",
        padding: "12px",
        borderRadius: "4px",
        width: "auto",
        minWidth: "calc((100% - 5 * 9px) / 6)",
      }}
    >
      {category.label}
    </Button>
  ) : (
    <MobileTab
      onClick={() => {
        history.push(category.path);
      }}
    >
      <div>{category.label}</div>
      <Icon iconUrl={iconArrow} width={"20px"} height={"20px"} />
    </MobileTab>
  );
};

export default CategoryTab;
