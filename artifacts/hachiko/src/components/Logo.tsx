import logoImg from "@assets/hachiko_logo_transparent.png";

interface LogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}

export function HachikoLogo({ variant = "dark", size = "md" }: LogoProps) {
  const textColor = variant === "light" ? "#ffffff" : "#0f2d1a";
  const greenColor = "#1e7a39";

  const iconSize = size === "sm" ? 36 : size === "lg" ? 60 : 48;
  const fontSize = size === "sm" ? 18 : size === "lg" ? 28 : 22;
  const subtitleSize = size === "sm" ? 8 : size === "lg" ? 12 : 10;

  return (
    <div className="flex items-center gap-2.5 select-none">
      <img
        src={logoImg}
        alt="Hachiko Vet logo"
        style={{ width: iconSize, height: iconSize, objectFit: "contain" }}
      />
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
