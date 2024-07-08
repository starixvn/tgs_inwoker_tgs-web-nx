import { FilterDepositList } from "@tgs-web-nx/types";
import { useGroupList, useThirdPartyDeposit } from "@tgs-web-nx/core/hooks";
import { GroupCodeEnum } from "@tgs-web-nx/types";
import { Cards as GroupCards } from "../../components";
import { BankLayout } from "./BankLayout";
import { FpsLayout } from "./FpsLayout";
import { DefaultLayout } from "./DefaultLayout";
import { TrcLayout } from "./TrcLayout";
import { ThirdPartyLayout } from "./ThirdParty";
import { EWalletLayout } from "./EWalletLayout";
import { CoinsphLayout } from "./CoinsphLayout";
import { PulsaLayout } from "./PulsaLayout";
import { TronLayout } from "./TronLayout";
import ResultPopupDialog from "@/pages/deposit/components/ResultPopupDialog";

export type LayoutProps = {
  filterGroupList: FilterDepositList[]
  groupCode: string
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


  const layoutProps: LayoutProps = {groupCode, filterGroupList};

  /**
 * 對應 UI
 */
  const mapLayout = () => {
    switch (groupCode) {
      case GroupCodeEnum.Bank:
        return <BankLayout {...layoutProps} handlePerformDeposit={handlePerformDeposit} isThirdPartyPending={isPending} />

      case GroupCodeEnum.FPS:
        return <FpsLayout {...layoutProps} />

      case GroupCodeEnum.TRON:
        return <TronLayout {...layoutProps} handlePerformDeposit={handlePerformDeposit} />

      case GroupCodeEnum.TRC:
        return <TrcLayout {...layoutProps} />

      case GroupCodeEnum.ALI2ALI:
        return <ThirdPartyLayout {...layoutProps} />

      case GroupCodeEnum.EWallet:
        return <EWalletLayout {...layoutProps} />

      case GroupCodeEnum.Coinsph:
        return <CoinsphLayout {...layoutProps} />

      case GroupCodeEnum.Pulsa:
        return <PulsaLayout {...layoutProps} />

      default:
        return <DefaultLayout {...layoutProps} handlePerformDeposit={handlePerformDeposit} isThirdPartyPending={isPending}/>
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
