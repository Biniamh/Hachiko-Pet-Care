interface LogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}

export function HachikoLogo({ variant = "dark", size = "md" }: LogoProps) {
  const textColor = variant === "light" ? "#ffffff" : "#0f2d1a";
  const greenColor = "#1e7a39";
  const greenLight = "#2ea84f";

  const iconSize = size === "sm" ? 28 : size === "lg" ? 48 : 38;
  const fontSize = size === "sm" ? 18 : size === "lg" ? 28 : 22;
  const subtitleSize = size === "sm" ? 8 : size === "lg" ? 12 : 10;

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Icon Mark */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Circle background */}
        <circle cx="24" cy="24" r="24" fill={greenColor} />

        {/* Paw print - main pad */}
        <ellipse cx="24" cy="28" rx="8" ry="7" fill="white" />

        {/* Paw print - toes */}
        <ellipse cx="14" cy="21" rx="3.5" ry="3" fill="white" />
        <ellipse cx="19.5" cy="17.5" rx="3.5" ry="3" fill="white" />
        <ellipse cx="28.5" cy="17.5" rx="3.5" ry="3" fill="white" />
        <ellipse cx="34" cy="21" rx="3.5" ry="3" fill="white" />

        {/* Medical cross overlay */}
        <rect x="21.5" y="25" width="5" height="5" rx="0.5" fill={greenColor} />
        <rect x="19" y="27.5" width="10" height="2.5" rx="0.5" fill={greenColor} />
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: `${fontSize}px`,
            fontWeight: 700,
            color: textColor,
            letterSpacing: "-0.02em",
          }}
        >
          Hachiko
        </span>
        <span
          style={{
            fontFamily: "'Outfit', system-ui, sans-serif",
            fontSize: `${subtitleSize}px`,
            fontWeight: 600,
            color: greenColor,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Veterinary Care
        </span>
      </div>
    </div>
  );
}
