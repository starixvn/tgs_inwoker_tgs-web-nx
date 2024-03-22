import { FilterDepositList } from "@tgs-web-nx/types";
import { useGroupList } from "../../hooks";
import { GroupCodeEnum } from "../../types";
import { Cards as GroupCards } from "../../components";
import { BankLayout } from "./BankLayout";
import { FpsLayout } from "./FpsLayout";
import { DefaultLayout } from "./DefaultLayout";
import { TrcLayout } from "./TrcLayout";
import { ALI2ALILayout } from "./ALI2ALILayout";
import { EWalletLayout } from "./EWalletLayout";
import { CoinsphLayout } from "./CoinsphLayout";

export type LayoutProps = {
  filterGroupList: FilterDepositList[]
  groupCode: string
  isShowDepositSelectBankName?: boolean;
  handleSubmit?: () => void;
}

/**
 * 自訂義 Group UI + 對應 UI
 */
const FormLayout = () => {
  const {groupCode, groupList, filterGroupList} = useGroupList();

  const props = {
    i18nParam: "depositAndWithdrawalStatus.depositMode",
    list: groupList,
    hasIcon: true,
  };

  const layoutProps: LayoutProps = {groupCode, filterGroupList};
  
  /**
 * 對應 UI
 */
  const mapLayout = () => {
    switch (groupCode) {
      case GroupCodeEnum.Bank:
        return <BankLayout {...layoutProps} />

      case GroupCodeEnum.FPS:
        return <FpsLayout {...layoutProps} />

      case GroupCodeEnum.TRC:
        return <TrcLayout {...layoutProps} />

      case GroupCodeEnum.ALI2ALI:
        return <ALI2ALILayout {...layoutProps} />

      case GroupCodeEnum.EWallet:
        return <EWalletLayout {...layoutProps} />
    
      case GroupCodeEnum.Coinsph:
        return <CoinsphLayout {...layoutProps} />

      default:
        return <DefaultLayout {...layoutProps} />
    }
  }

  return (
    <>
      {/* 自訂義 Group UI */}
      <GroupCards {...props}/>

      {/* 對應 UI */}
      {mapLayout()}
    </>
  )
}

export default FormLayout;