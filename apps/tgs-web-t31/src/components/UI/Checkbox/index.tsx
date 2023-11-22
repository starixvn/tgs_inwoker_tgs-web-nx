import { Checkbox as MuiCheckbox, styled as muiStyled } from "@mui/material";

const StyledCheckbox = styled(MuiCheckbox)`
  color: ${({ theme }) => theme.white} !important;
  &.Mui-checked {
    color: ${({ theme }) => theme.priBTNOutline} !important;
  }
`;
const Checkbox = (props: CheckboxProps) => {
  return <StyledCheckbox {...props} />;
};

export default Checkbox;
