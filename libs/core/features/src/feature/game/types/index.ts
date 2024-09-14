export enum FilterTagTypeEnum {
  "PROVIDER" = "PROVIDER",
  "ALL" = "ALL",
  "HOT" = "HOT",
  "NEW" = "NEW",
  "RECOMMEND" = "RECOMMEND",
  "FAVORITE" = "FAVORITE",
}

export interface FilterTag {
  name: string;
  tagType: OrderTypeEnum;
  gpCode?: string;
  iconUrl?: string;
  activedUrl?: string
}

export enum OrderTypeEnum {
  "HOT" = 1,
  "A_Z" = 2,
  "Z_A" = 3,
  "NEW" = 4,
}
export enum TagTypeEnum {
  "NONE" = 0,
  "NEW" = 1,
  "HOT" = 2,
  "RECOMMEND" = 4,
}
