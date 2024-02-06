import {DepositType} from '@tgs-web-nx/types';
import {DepositMethodList, Payment} from './types'

/**
 * 將 DepositType 依照 method groupBy
 * @param depositTypeList API 傳入的 depositTypeList
 * @returns groupBy 後的陣列
 */
export const formatDepositTypeList = (depositTypeList: DepositType[]): DepositMethodList[] => {
  const methodMap: Record<string, DepositMethodList> = {};

  depositTypeList.forEach(depositType => {
    if(depositType.method){
      depositType.method.forEach(method => {
      const { methodcode, methodid, displayname } = method;

      // 如果 methodcode 還沒有在 methodMap 中，則創建一個新的 DepositMethodList
      if (!methodMap[methodcode]) {
        methodMap[methodcode] = {
          methodcode,
          methodid,
          displayname,
          paymentList: []
        };
      }

      const depositMethod = methodMap[methodcode];

      const formatPayment: Payment = {
        paymentcode: depositType.paymentcode,
        paymentid: depositType.paymentid,
        displayorder: depositType.displayorder
      };

      const existingPayment: Payment | undefined = depositMethod.paymentList.find(payment => payment.paymentcode === formatPayment.paymentcode);
      if (!existingPayment) {
        depositMethod.paymentList.push(formatPayment);
        return;
      }
    });}
  });
  
  return Object.values(methodMap);
};