export function formatWithFractions(digit: number) {
  return `${digit}.${(digit % 1).toString().padEnd(2, '0')}`;
}
