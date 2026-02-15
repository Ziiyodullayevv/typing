export function calculateAccuracy(correctChars: number, totalTypedChars: number): number {
  if (totalTypedChars <= 0) return 0;
  return Math.round((correctChars / totalTypedChars) * 100);
}
