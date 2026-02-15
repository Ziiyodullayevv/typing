export function getStars(accuracy: number): number {
  if (accuracy >= 95) return 3;
  if (accuracy >= 85) return 2;
  if (accuracy >= 70) return 1;
  return 0;
}

export function getStarDisplay(stars: number): string {
  return "★".repeat(stars) + "☆".repeat(3 - stars);
}
