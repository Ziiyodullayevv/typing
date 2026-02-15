export function calculateWpm(correctChars: number, minutes: number): number {
  if (minutes <= 0) return 0;
  return Math.round(correctChars / 5 / minutes);
}
