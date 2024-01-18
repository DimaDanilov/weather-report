// Receives number for example - 7405, and return first digit - 7
export function firstDigit(num: number) {
  const matches = String(num);
  const digit = Number(matches[0]);
  return num < 0 ? -digit : digit;
}
