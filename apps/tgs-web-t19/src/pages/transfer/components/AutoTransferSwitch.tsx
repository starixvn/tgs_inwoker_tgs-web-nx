import React from "react";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import { i18n } from "@tgs-web-nx/utils";
import { useAutoTransferSwitch } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Loading from "@/components/UI/Loading";
import { Button } from "@/components/UI/Button";
import { Switch } from "@/components/UI/Switch";
import { media } from "@/theme/breakpoints";
import { theme } from "@/theme";

const TransferSwitch = muiStyled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(32px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.blue40,
      },
    },
  },
}));

const AutoTransferContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;

  ${media.md} {
    flex-wrap: nowrap;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 8px;

  ${media.md} {
    flex-direction: row;
    flex-wrap: nowrap;
  }
`;

const ButtonWrapper = styled.div`
  flex-shrink: 0;

  ${media.md} {
    margin-left: auto;
  }
`;

const AutoTransferSwitch = (props: React.HTMLProps<HTMLDivElement>) => {
  const { isChecked, isLoading, handleSwitchAutoTransfer, performWithdrawFromEveryBrand } =
    useAutoTransferSwitch();
  const { isLargeDesktopSize } = useRwd();

  return (
    //@ts-ignore
    <AutoTransferContainer {...props}>
      {!isLargeDesktopSize && (
        <Button
          fullWidth
          onClick={() => {
            performWithdrawFromEveryBrand();
          }}
        >
          {i18n.t("transfer.oneKeyTransferOut")}
        </Button>
      )}
      <Group>
        {`${i18n.t("transfer.autoTransfer")} (${
          isChecked ? i18n.t("transfer.on") : i18n.t("transfer.off")
        })`}
        <TransferSwitch checked={isChecked} onChange={handleSwitchAutoTransfer} />
      </Group>

      {isLargeDesktopSize && (
        <ButtonWrapper>
          <Button
            onClick={() => {
              performWithdrawFromEveryBrand();
            }}
          >
            {i18n.t("transfer.oneKeyTransferOut")}
          </Button>
        </ButtonWrapper>
      )}
      <Loading show={isLoading} />
    </AutoTransferContainer>
  );
};

export default React.memo(AutoTransferSwitch);
