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
  tagType: FilterTagTypeEnum;
  gpCode?: string;
  iconUrl?: string;
  activedUrl?: string
}

export enum TagTypeEnum {
  "NONE" = 0,
  "NEW" = 1,
  "HOT" = 2,
  "RECOMMEND" = 4,
}
