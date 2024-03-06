import {ReactNode} from 'react';

export type DepositFormData = {
  amount: string;
  banktype: string;
  paymentid: string;
  promotionid: string
  paymentcode: string
  type: string
}

export type FormContainerProps = {
  children: ReactNode;
  label: string;
}

export type RenderLayerConfig = {
  isVisible: boolean,
  i18nParam: string,
  list: {
    iconUrl: string,
    isActive: boolean,
    onClick: (value: string) => void,
    children: ReactNode | string,
    code: string,
  }[],
}


export type RenderLayer = (config: RenderLayerConfig) => ReactNode | null;