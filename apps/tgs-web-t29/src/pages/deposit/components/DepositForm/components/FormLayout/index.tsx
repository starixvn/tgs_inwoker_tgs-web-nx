import { FilterDepositList } from "@tgs-web-nx/types";
import { useGroupList } from "../../hooks";
import { GroupCodeEnum } from "../../types";
import { Cards as GroupCards } from "../../components";
import { BankLayout } from "./BankLayout";
import { DefaultLayout } from "./DefaultLayout";

export type LayoutProps = {
  filterGroupList: FilterDepositList[]
  groupCode: string
}

/**
 * 自訂義 Group UI + 對應 UI
 */
const FormLayout = () => {
  const {groupCode, groupList, filterGroupList} = useGroupList();

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
        return <BankLayout {...layoutProps} />
    
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