export function firstDigit(num: number) {
  const matches = String(num);
  const digit = Number(matches[0]);
  return num < 0 ? -digit : digit;
}
