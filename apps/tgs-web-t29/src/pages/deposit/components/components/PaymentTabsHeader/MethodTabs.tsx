import { memo } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useWalletStore } from "@tgs-web-nx/core";
import { BadgeContainer } from "./components/BadgeContainer";
import Badge from "./components/Badge";
import {LabelContainer} from "./components/LabelContainer";
import { formatDepositTypeList } from "@/components/account/DepositPrev/utils";
import {ItemContainer,} from "@/components/styled-component/ProfileForms";

type Props = {
  activeMethod: string;
  handleMethodChange: (value: string) => void;
};

const MethodTabs = ({
  activeMethod,
  handleMethodChange
}: Props) => {
  const { wallet } = useWalletStore();
  const transferChannels = wallet.depositList;

  const formatTypes = formatDepositTypeList(wallet.depositTypeList);

  if (!transferChannels?.length) return null;

  return (
    <ItemContainer>
      <LabelContainer>{i18n.t("depositAndWithdrawalStatus.depositMode")}</LabelContainer>
      <BadgeContainer>
        {formatTypes?.map((depositType, index) => {
          const { methodcode } = depositType;
          return (
            <Badge
              key={index}
              text={i18n.t(methodcode)}
              isActive={methodcode === activeMethod}
              handleClick={() => handleMethodChange(methodcode)}
            />
          );
        })}
      </BadgeContainer>
    </ItemContainer>
  );
};

export default memo(MethodTabs);
