"use client";

export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle */}
      <circle cx="250" cy="200" r="180" fill="#F8FFFB" />
      <circle cx="250" cy="200" r="160" fill="#E8F8F0" />

      {/* Laptop */}
      <rect x="140" y="180" width="220" height="140" rx="12" fill="#12372A" />
      <rect x="150" y="190" width="200" height="110" rx="6" fill="#2D3748" />
      <rect x="120" y="320" width="260" height="15" rx="4" fill="#12372A" />

      {/* Screen content - typing text */}
      <rect x="165" y="205" width="170" height="8" rx="2" fill="#00A76F" opacity="0.8" />
      <rect x="165" y="220" width="140" height="8" rx="2" fill="#5BE49B" />
      <rect x="165" y="235" width="160" height="8" rx="2" fill="#00A76F" opacity="0.6" />
      <rect x="165" y="250" width="120" height="8" rx="2" fill="#5BE49B" opacity="0.8" />
      <rect x="165" y="265" width="150" height="8" rx="2" fill="#00A76F" />

      {/* Keyboard keys */}
      <rect x="160" y="335" width="25" height="12" rx="3" fill="#5BE49B" />
      <rect x="190" y="335" width="25" height="12" rx="3" fill="#00A76F" />
      <rect x="220" y="335" width="25" height="12" rx="3" fill="#5BE49B" />
      <rect x="250" y="335" width="25" height="12" rx="3" fill="#00A76F" />
      <rect x="280" y="335" width="25" height="12" rx="3" fill="#5BE49B" />
      <rect x="310" y="335" width="25" height="12" rx="3" fill="#00A76F" />

      {/* Kid character */}
      {/* Head */}
      <circle cx="320" cy="140" r="45" fill="#FFD93D" />
      <circle cx="320" cy="140" r="40" fill="#FFF4BD" />

      {/* Hair */}
      <path d="M285 120 C285 90 355 90 355 120 L355 100 C355 70 285 70 285 100 Z" fill="#5D4037" />

      {/* Eyes */}
      <ellipse cx="308" cy="140" rx="6" ry="7" fill="#12372A" />
      <ellipse cx="332" cy="140" rx="6" ry="7" fill="#12372A" />
      <circle cx="310" cy="138" r="2" fill="white" />
      <circle cx="334" cy="138" r="2" fill="white" />

      {/* Smile */}
      <path d="M310 155 Q320 165 330 155" stroke="#12372A" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Blush */}
      <ellipse cx="300" cy="152" rx="8" ry="5" fill="#FFB4B4" opacity="0.6" />
      <ellipse cx="340" cy="152" rx="8" ry="5" fill="#FFB4B4" opacity="0.6" />

      {/* Body */}
      <path d="M290 180 Q320 195 350 180 L360 250 Q320 260 280 250 Z" fill="#00A76F" />

      {/* Arms typing */}
      <path d="M280 200 Q250 220 260 250" stroke="#FFD93D" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M360 200 Q390 220 380 250" stroke="#FFD93D" strokeWidth="12" strokeLinecap="round" fill="none" />

      {/* Floating stars */}
      <g transform="translate(100, 100)">
        <path d="M12 0L15 9L24 9L17 15L19 24L12 18L5 24L7 15L0 9L9 9Z" fill="#FFB020" />
      </g>
      <g transform="translate(400, 120)">
        <path d="M12 0L15 9L24 9L17 15L19 24L12 18L5 24L7 15L0 9L9 9Z" fill="#FFB020" />
      </g>
      <g transform="translate(80, 250)">
        <path d="M8 0L10 6L16 6L11 10L13 16L8 12L3 16L5 10L0 6L6 6Z" fill="#5BE49B" />
      </g>
      <g transform="translate(420, 280)">
        <path d="M8 0L10 6L16 6L11 10L13 16L8 12L3 16L5 10L0 6L6 6Z" fill="#5BE49B" />
      </g>

      {/* Floating letters */}
      <text x="90" y="180" fontSize="24" fontWeight="bold" fill="#00A76F" opacity="0.6">F</text>
      <text x="410" y="200" fontSize="20" fontWeight="bold" fill="#5BE49B" opacity="0.7">J</text>
      <text x="130" y="300" fontSize="18" fontWeight="bold" fill="#FFB020" opacity="0.5">K</text>

      {/* Mascot cat */}
      <g transform="translate(60, 160)">
        {/* Cat body */}
        <ellipse cx="30" cy="40" rx="25" ry="20" fill="#00A76F" />
        {/* Cat head */}
        <circle cx="30" cy="15" r="18" fill="#00A76F" />
        {/* Ears */}
        <path d="M15 5 L10 -10 L22 2 Z" fill="#00A76F" />
        <path d="M45 5 L50 -10 L38 2 Z" fill="#00A76F" />
        <path d="M17 3 L14 -6 L21 1 Z" fill="#FFB4B4" />
        <path d="M43 3 L46 -6 L39 1 Z" fill="#FFB4B4" />
        {/* Eyes */}
        <circle cx="24" cy="14" r="3" fill="white" />
        <circle cx="36" cy="14" r="3" fill="white" />
        <circle cx="24" cy="14" r="1.5" fill="#12372A" />
        <circle cx="36" cy="14" r="1.5" fill="#12372A" />
        {/* Nose */}
        <ellipse cx="30" cy="19" rx="2" ry="1.5" fill="#FFB4B4" />
        {/* Mouth */}
        <path d="M27 22 Q30 25 33 22" stroke="#12372A" strokeWidth="1" fill="none" />
        {/* Whiskers */}
        <line x1="8" y1="16" x2="20" y2="18" stroke="#12372A" strokeWidth="0.8" />
        <line x1="8" y1="20" x2="20" y2="20" stroke="#12372A" strokeWidth="0.8" />
        <line x1="40" y1="18" x2="52" y2="16" stroke="#12372A" strokeWidth="0.8" />
        <line x1="40" y1="20" x2="52" y2="20" stroke="#12372A" strokeWidth="0.8" />
      </g>
    </svg>
  );
}
