export function toFixedDecimals(num: number, decimals = 2) {
  return num % 1 === 0 ? num : parseFloat(num.toFixed(decimals));
}
