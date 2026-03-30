"use client";

/**
 * Animated SVG illustration showing the "bits in byte" -> "bites in byte" story.
 * Shows a byte (8 bits) with a playful bite taken out, and the name transformation.
 * Uses currentColor so it adapts to light/dark themes.
 */
export function BitesIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 320"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
    >
      {/* ── Background grid dots ──────────────────────── */}
      <g opacity="0.06">
        {Array.from({ length: 12 }).map((_, row) =>
          Array.from({ length: 16 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={30 + col * 28}
              cy={20 + row * 28}
              r="1"
              fill="currentColor"
            />
          ))
        )}
      </g>

      {/* ── The 8 bits (byte visualization) ───────────── */}
      <g transform="translate(60, 60)">
        {/* Label */}
        <text
          x="180"
          y="-10"
          textAnchor="middle"
          fontSize="11"
          fontFamily="monospace"
          fill="currentColor"
          opacity="0.4"
        >
          1 byte = 8 bits
        </text>

        {/* 8 bit cells */}
        {[1, 0, 1, 1, 0, 0, 1, 0].map((bit, i) => (
          <g key={i} transform={`translate(${i * 45}, 0)`}>
            <rect
              width="38"
              height="44"
              rx="8"
              fill="currentColor"
              opacity={bit ? 0.12 : 0.04}
              stroke="currentColor"
              strokeOpacity="0.15"
              strokeWidth="1"
            />
            <text
              x="19"
              y="28"
              textAnchor="middle"
              fontSize="18"
              fontFamily="monospace"
              fontWeight="600"
              fill="currentColor"
              opacity={bit ? 0.7 : 0.2}
            >
              {bit}
            </text>
          </g>
        ))}
      </g>

      {/* ── Bite mark on the byte ─────────────────────── */}
      <g transform="translate(342, 52)">
        {/* Bite circle cutout effect */}
        <circle
          cx="18"
          cy="20"
          r="22"
          fill="currentColor"
          opacity="0.06"
        />
        <path
          d="M10 4 Q18 14 10 24 Q18 20 26 24 Q18 14 26 4 Q18 8 10 4Z"
          fill="currentColor"
          opacity="0.2"
          transform="translate(4, 6)"
        />
      </g>

      {/* ── Name transformation ───────────────────────── */}
      <g transform="translate(40, 150)">
        {/* "bitsinbyte" crossed out */}
        <text
          x="0"
          y="30"
          fontSize="22"
          fontFamily="monospace"
          fontWeight="500"
          fill="currentColor"
          opacity="0.3"
        >
          bitsinbyte
        </text>
        <line
          x1="-4"
          y1="24"
          x2="195"
          y2="24"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <text
          x="210"
          y="30"
          fontSize="13"
          fontFamily="sans-serif"
          fill="currentColor"
          opacity="0.35"
        >
          taken!
        </text>

        {/* Arrow */}
        <path
          d="M130 45 L130 60 L126 56 M130 60 L134 56"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* "bitesinbyte" - the chosen name */}
        <text
          x="0"
          y="90"
          fontSize="26"
          fontFamily="monospace"
          fontWeight="700"
          fill="currentColor"
          opacity="0.85"
        >
          bites
          <tspan opacity="0.4">in</tspan>
          byte
        </text>
      </g>

      {/* ── Bottom visual: three "bites" ──────────────── */}
      <g transform="translate(60, 265)">
        {[
          { label: "compact", x: 0 },
          { label: "impactful", x: 140 },
          { label: "practical", x: 280 },
        ].map((item) => (
          <g key={item.label} transform={`translate(${item.x}, 0)`}>
            <rect
              width="110"
              height="32"
              rx="16"
              fill="currentColor"
              opacity="0.06"
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="1"
            />
            <text
              x="55"
              y="20"
              textAnchor="middle"
              fontSize="12"
              fontFamily="sans-serif"
              fill="currentColor"
              opacity="0.5"
            >
              {item.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
