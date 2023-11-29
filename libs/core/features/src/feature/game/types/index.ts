export enum FilterTagTypeEnum {
  "PROVIDER" = "PROVIDER",
  "ALL" = "All",
  "HOT" = "HOT",
  "NEW" = "NEW",
  "RECOMMEND" = "RECOMMEND",
  "FAVORITE" = "FAVORITE",
}

export interface FilterTag {
  name: string;
  tagType: FilterTagTypeEnum;
  gpCode?: string;
  iconUrl?:string;
  activedUrl?:string
}
