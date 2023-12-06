import Common from "./Common";

export function formatAmount(x: number | string) {
  return Common.formatNumberWithCommas(x).replace(/\.?0+$/, "");
}
