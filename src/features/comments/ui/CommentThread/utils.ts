export function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace('.0', '')} тыс`;
  }
  return num.toString();
}
