import { FilterDepositList } from "@tgs-web-nx/types";
import { useThirdPartyDeposit, useMOVNList } from "../../hooks";
import { DefaultLayout } from "../FormLayout/DefaultLayout";
import { Cards } from "../../components";
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
const MovnFormLayout = () => {
    const {movnCode, movnList, filterMovnList} = useMOVNList();
    const {handlePerformDeposit, isDialogOpen, handleOpenPopupUrl, handleOnClose, isPending} = useThirdPartyDeposit();
    const props = {
        i18nParam: "depositAndWithdrawalStatus.depositMode",
        list: movnList,
    };
    
    return (
    <>
      {/* 自訂義 Group UI */}
        <Cards {...props}/>
        <DefaultLayout 
            filterGroupList={filterMovnList}
            groupCode={movnCode}
            isThirdPartyPending={isPending}
            handlePerformDeposit={handlePerformDeposit}
        />


        <ResultPopupDialog 
            isDialogOpen={isDialogOpen}
            handleClose={handleOnClose}
            handleOpenPopupUrl={handleOpenPopupUrl}
        />
    </>
    )
}

export default MovnFormLayout;
