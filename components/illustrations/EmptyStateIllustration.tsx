"use client";

export default function EmptyStateIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <circle cx="200" cy="150" r="120" fill="#F8FFFB" />

      {/* Laptop */}
      <rect x="130" y="100" width="140" height="100" rx="8" fill="#12372A" />
      <rect x="138" y="108" width="124" height="80" rx="4" fill="#2D3748" />
      <rect x="110" y="200" width="180" height="12" rx="4" fill="#12372A" />

      {/* Screen - empty */}
      <rect x="155" y="125" width="90" height="6" rx="2" fill="#5BE49B" opacity="0.4" />
      <rect x="155" y="140" width="70" height="6" rx="2" fill="#5BE49B" opacity="0.3" />
      <rect x="155" y="155" width="80" height="6" rx="2" fill="#5BE49B" opacity="0.2" />

      {/* Question mark */}
      <text x="190" y="180" fontSize="28" fontWeight="bold" fill="#5BE49B" opacity="0.5">?</text>

      {/* Cute owl mascot */}
      <g transform="translate(280, 100)">
        {/* Body */}
        <ellipse cx="30" cy="45" rx="28" ry="25" fill="#5BE49B" />
        {/* Head */}
        <circle cx="30" cy="20" r="22" fill="#5BE49B" />
        {/* Ears */}
        <path d="M12 8 L5 -8 L20 5 Z" fill="#5BE49B" />
        <path d="M48 8 L55 -8 L40 5 Z" fill="#5BE49B" />
        <path d="M14 6 L9 -4 L19 4 Z" fill="#FFB4B4" />
        <path d="M46 6 L51 -4 L41 4 Z" fill="#FFB4B4" />
        {/* Eyes */}
        <circle cx="22" cy="18" r="8" fill="white" />
        <circle cx="38" cy="18" r="8" fill="white" />
        <circle cx="22" cy="18" r="4" fill="#12372A" />
        <circle cx="38" cy="18" r="4" fill="#12372A" />
        <circle cx="24" cy="16" r="1.5" fill="white" />
        <circle cx="40" cy="16" r="1.5" fill="white" />
        {/* Beak */}
        <path d="M27 26 L30 32 L33 26 Z" fill="#FFB020" />
      </g>

      {/* Floating elements */}
      <circle cx="80" cy="120" r="15" fill="#FFB020" opacity="0.3" />
      <circle cx="320" cy="200" r="12" fill="#FF6B6B" opacity="0.3" />
      <circle cx="100" cy="220" r="10" fill="#4ECDC4" opacity="0.3" />
    </svg>
  );
}
