import { useColorContext } from "@/context/colorContext";
import { IconChevronDown, IconSun } from "@tabler/icons-react";
import Color from "colorjs.io";
import { useEffect } from "react";

const ThemeToggler = () => {
  const { setColor } = useColorContext();
  const themes = [
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
    "caramellatte",
    "abyss",
    "silk",
  ];

  function oklchToHex(oklchString: string) {
    return new Color(oklchString)
      .toGamut({ space: "srgb" })
      .to("srgb")
      .toString({ format: "hex" });
  }

  themes.sort();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    applyTheme(storedTheme);
  }, []);

  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    document.documentElement.setAttribute("data-theme", theme);
    setColor(
      oklchToHex(
        getComputedStyle(root).getPropertyValue("--color-primary").trim()
      )
    );
    localStorage.setItem("theme", theme);
  };

  const handleThemeChange = (theme: string) => {
    applyTheme(theme);
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className={`btn btn-primary text-primary-content flex items-center gap-2`}
      >
        <IconSun />
        <IconChevronDown />
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 overflow-y-auto h-80 shadow-2xl text-base-content"
      >
        <div>
          {themes.map((theme) => (
            <li key={theme}>
              <input
                type="radio"
                name="theme-dropdown"
                aria-label={theme}
                value={theme}
                onChange={() => handleThemeChange(theme)}
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start capitalize"
              />
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default ThemeToggler;
