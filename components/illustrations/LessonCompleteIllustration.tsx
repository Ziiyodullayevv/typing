"use client";

export default function LessonCompleteIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <circle cx="200" cy="150" r="130" fill="#F8FFFB" />

      {/* Trophy */}
      <path d="M160 80 L240 80 L230 140 Q200 160 170 140 Z" fill="#FFB020" />
      <rect x="190" y="140" width="20" height="30" fill="#FFB020" />
      <rect x="170" y="170" width="60" height="15" rx="4" fill="#FFB020" />

      {/* Trophy shine */}
      <path d="M170 90 L180 90 L175 120 L165 120 Z" fill="#FFD93D" opacity="0.6" />

      {/* Trophy handles */}
      <path d="M160 90 Q140 90 140 110 Q140 130 160 130" stroke="#FFB020" strokeWidth="8" fill="none" />
      <path d="M240 90 Q260 90 260 110 Q260 130 240 130" stroke="#FFB020" strokeWidth="8" fill="none" />

      {/* Stars around trophy */}
      <g transform="translate(120, 60)">
        <path d="M10 0L12.5 7.5L20 7.5L14 12.5L16 20L10 15L4 20L6 12.5L0 7.5L7.5 7.5Z" fill="#FFB020" />
      </g>
      <g transform="translate(260, 60)">
        <path d="M10 0L12.5 7.5L20 7.5L14 12.5L16 20L10 15L4 20L6 12.5L0 7.5L7.5 7.5Z" fill="#FFB020" />
      </g>
      <g transform="translate(100, 120)">
        <path d="M8 0L10 6L16 6L11 10L13 16L8 12L3 16L5 10L0 6L6 6Z" fill="#5BE49B" />
      </g>
      <g transform="translate(280, 120)">
        <path d="M8 0L10 6L16 6L11 10L13 16L8 12L3 16L5 10L0 6L6 6Z" fill="#5BE49B" />
      </g>

      {/* Confetti */}
      <rect x="80" y="40" width="8" height="8" rx="1" fill="#FF6B6B" transform="rotate(45 84 44)" />
      <rect x="300" y="50" width="8" height="8" rx="1" fill="#4ECDC4" transform="rotate(30 304 54)" />
      <rect x="150" y="30" width="6" height="6" rx="1" fill="#FFE66D" transform="rotate(60 153 33)" />
      <rect x="250" y="35" width="6" height="6" rx="1" fill="#95E1D3" transform="rotate(15 253 38)" />
      <rect x="70" y="80" width="5" height="5" rx="1" fill="#AA96DA" transform="rotate(40 72 82)" />
      <rect x="320" y="90" width="5" height="5" rx="1" fill="#F38181" transform="rotate(20 322 92)" />

      {/* Happy kid */}
      <circle cx="200" cy="220" r="35" fill="#FFD93D" />
      <circle cx="200" cy="220" r="30" fill="#FFF4BD" />

      {/* Kid eyes - happy */}
      <path d="M188 215 Q192 210 196 215" stroke="#12372A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M204 215 Q208 210 212 215" stroke="#12372A" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Big smile */}
      <path d="M188 228 Q200 240 212 228" stroke="#12372A" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Blush */}
      <ellipse cx="185" cy="225" rx="6" ry="4" fill="#FFB4B4" opacity="0.6" />
      <ellipse cx="215" cy="225" rx="6" ry="4" fill="#FFB4B4" opacity="0.6" />
    </svg>
  );
}
