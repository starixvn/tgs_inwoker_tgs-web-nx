import {
  CopyIcon
} from "@/components/UI/CustomizeIcon";
import { useNotifications } from "@tgs-web-nx/core/features";
import { i18n, utility } from "@tgs-web-nx/utils";
import { useSnackbar } from "notistack";
import styled from "styled-components";


const CopyIconContainer = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
  position: absolute;
  right: 0;
  bottom: 0;
  transition: all ease-in-out 0.2s;
  color: #55657E;
  &:hover {
    color: #fff;
  }
`;

type Props = {
  copyContent: any;
};
const CopyIconStyled = ({ copyContent }: Props) => {
  const { alert } = useNotifications();
  const { enqueueSnackbar } = useSnackbar();

  const performCopy = (content: any) => {
    //alert("", i18n.t("affiliate.copied"));
    enqueueSnackbar(i18n.t("affiliate.copied"), {
      variant: "success",
    });

    utility.copy(content);
  };

  return (
    <CopyIconContainer
      onClick={() => {
        performCopy(copyContent);
      }}
    >
      <CopyIcon sx={{fontSize: "2rem", color: "inherit"}} viewBox="0 0 16 16"></CopyIcon>
    </CopyIconContainer>
  );
};

export default CopyIconStyled;
