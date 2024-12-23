import { IconChevronDown, IconSun } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const ThemeController = () => {
  const themes = [
    "baseTheme",
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];
  const [currentTheme, setCurrentTheme] = useState<string>("baseTheme");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "baseTheme";
    setCurrentTheme(storedTheme);
    applyTheme(storedTheme);
  }, []);

  const applyTheme = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-primary text-primary-content flex items-center gap-2"
      >
        <IconSun />
        <IconChevronDown />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 overflow-y-auto block h-80 shadow-2xl text-base-content"
      >
        {themes.map((theme) => (
          <li key={theme}>
            <label className="theme-controller btn btn-sm btn-block btn-ghost justify-start capitalize">
              <input
                type="radio"
                name="theme-dropdown"
                aria-label={theme}
                value={theme}
                onChange={() => handleThemeChange(theme)}
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start capitalize"
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeController;