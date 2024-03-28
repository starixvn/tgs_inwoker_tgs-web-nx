import { FilterDepositList } from "@tgs-web-nx/types";
import { useGroupList, useThirdPartyDeposit } from "../../hooks";
import { GroupCodeEnum } from "../../types";
import { Cards as GroupCards } from "../../components";
import { BankLayout } from "./BankLayout";
import { FpsLayout } from "./FpsLayout";
import { DefaultLayout } from "./DefaultLayout";
import { TrcLayout } from "./TrcLayout";
import { ALI2ALILayout } from "./ALI2ALILayout";
import { EWalletLayout } from "./EWalletLayout";
import { CoinsphLayout } from "./CoinsphLayout";
import { GCashLayout } from "./GCashLayout";
import { PulsaLayout } from "./PulsaLayout";
import ResultPopupDialog from "@/pages/deposit/components/ResultPopupDialog";

export type LayoutProps = {
  filterGroupList: FilterDepositList[]
  groupCode: string
  handleSubmit?: () => void;
  handlePerformDeposit?: () => void;
  isThirdPartyPending?: boolean;
}

/**
 * 自訂義 Group UI + 對應 UI
 */
const FormLayout = () => {
  const {groupCode, groupList, filterGroupList} = useGroupList();
  const {handlePerformDeposit, isDialogOpen, handleOpenPopupUrl, handleOnClose, isPending} = useThirdPartyDeposit();
  const props = {
    i18nParam: "depositAndWithdrawalStatus.depositMode",
    list: groupList,
  };

  const layoutProps: LayoutProps = {groupCode, filterGroupList, handlePerformDeposit, isThirdPartyPending: isPending};

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

      case GroupCodeEnum.Pulsa:
        return <PulsaLayout {...layoutProps} />

      case GroupCodeEnum.GCash:
        return <GCashLayout {...layoutProps} />
        
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

      <ResultPopupDialog 
        isDialogOpen={isDialogOpen}
        handleClose={handleOnClose}
        handleOpenPopupUrl={handleOpenPopupUrl}
      />
    </>
  )
}

export default FormLayout;
