import { useTheme } from "context/Theme/ThemeContext";

function Logo() {
  const { theme } = useTheme();
  return (
    <img
      src={`${theme === "dark" ? "/logo/wagwan_dark.png" : "/logo/logo.png"}`}
      className="w-25"
      alt="logo"
    />
  );
}

export default Logo;
