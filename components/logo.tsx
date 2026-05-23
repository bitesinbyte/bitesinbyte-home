export function Logo({
  className,
  lit = true,
  onClick,
}: {
  className?: string;
  lit?: boolean;
  onClick?: () => void;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className ?? ""} transition-all duration-500 ${lit ? "lamp-glow" : ""} ${onClick ? "cursor-pointer" : ""}`}
      fill="none"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      aria-label={onClick ? (lit ? "Turn off the light" : "Turn on the light") : undefined}
    >
      {/* Bulb body */}
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 2.61 1.43 4.88 3.5 6.13V17.5c0 .28.22.5.5.5h6c.28 0 .5-.22.5-.5v-2.37C17.57 13.88 19 11.61 19 9c0-3.87-3.13-7-7-7Z"
        fill={lit ? "hsl(38, 85%, 55%)" : "currentColor"}
        opacity={lit ? 0.2 : 0.05}
        stroke="currentColor"
        strokeWidth="2"
        className="transition-all duration-500"
      />

      {/* Base lines */}
      <line x1="9" y1="20" x2="15" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="23" x2="14" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Inner glow - only visible when lit */}
      <circle
        cx="12"
        cy="9"
        r={lit ? 2.5 : 0}
        fill="hsl(38, 85%, 55%)"
        opacity={lit ? 0.8 : 0}
        className="transition-all duration-500"
      />

      {/* Rays - only when lit */}
      <g
        stroke="hsl(38, 85%, 55%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={lit ? 0.5 : 0}
        className="transition-all duration-500"
      >
        <line x1="12" y1="0" x2="12" y2="-2" />
        <line x1="5" y1="4" x2="3.5" y2="2.5" />
        <line x1="19" y1="4" x2="20.5" y2="2.5" />
        <line x1="2" y1="9" x2="0" y2="9" />
        <line x1="22" y1="9" x2="24" y2="9" />
      </g>
    </svg>
  );
}
