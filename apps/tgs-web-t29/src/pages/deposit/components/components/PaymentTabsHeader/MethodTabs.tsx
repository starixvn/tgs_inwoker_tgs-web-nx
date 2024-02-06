import { memo } from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useWalletStore } from "@tgs-web-nx/core";
import { BadgeContainer } from "./BadgeContainer";
import Badge from "@/pages/deposit/components/components/PaymentTabsHeader/Badge";
import { formatDepositTypeList } from "@/components/account/DepositPrev/utils";


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
  );
};

export default memo(MethodTabs);
