export interface ConditionType {
  level: number;
  depositAmount: number;
  validBetAmount: number;
  bonus: number;
  isSent: boolean;
}

export interface MilestoneType {
  name: string;
  subSubject: string;
  totalValidBetAmount: number;
  totalDepositAmount: number;
  from: string;
  to: string;
  promotionId: string;
  conditions: ConditionType[];
}

export class GetMilestoneListResDto {
  IsSuccess = true;
  code = 0;
  info: string | null = null;
  data: MilestoneType[] = [];
}
