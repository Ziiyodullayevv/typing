"use client";

import {
  Keyboard,
  Gamepad2,
  Trophy,
  Star,
  Medal,
  BadgeCheck,
  Rocket,
  BookOpen,
  User,
  Settings,
  Volume2,
  VolumeX,
  RotateCcw,
  Play,
  Pause,
  Home,
  BarChart3,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Zap,
  Heart,
  Award,
  Flame,
  Crown,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const icons = {
  keyboard: Keyboard,
  gamepad: Gamepad2,
  trophy: Trophy,
  star: Star,
  medal: Medal,
  badge: BadgeCheck,
  rocket: Rocket,
  book: BookOpen,
  user: User,
  settings: Settings,
  volumeOn: Volume2,
  volumeOff: VolumeX,
  rotate: RotateCcw,
  play: Play,
  pause: Pause,
  home: Home,
  chart: BarChart3,
  lock: Lock,
  unlock: Unlock,
  check: CheckCircle,
  x: XCircle,
  clock: Clock,
  target: Target,
  zap: Zap,
  heart: Heart,
  award: Award,
  flame: Flame,
  crown: Crown,
  sparkles: Sparkles,
} as const;

export type IconName = keyof typeof icons;

type AppIconProps = {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
};

export default function AppIcon({
  name,
  size = 24,
  className,
  strokeWidth = 2,
}: AppIconProps) {
  const Icon = icons[name];
  return <Icon size={size} className={className} strokeWidth={strokeWidth} />;
}
