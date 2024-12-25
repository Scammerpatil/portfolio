"use client";
import Color from "colorjs.io";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ColorContextType = {
  color: string;
  setColor: () => void;
};

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [color, setColorState] = useState<string>("#4a00ff");

  // Convert OKLCH to HEX
  function oklchToHex(oklchString: string) {
    const oklch = `oklch(${oklchString})`;
    return new Color(oklch)
      .toGamut({ space: "srgb" })
      .to("srgb")
      .toString({ format: "hex" });
  }

  // Method to trigger color update
  const triggerColorUpdate = useCallback(() => {
    try {
      const root = document.documentElement;
      const primaryColor = getComputedStyle(root)
        .getPropertyValue("--p")
        .trim();

      const convertedColor = oklchToHex(primaryColor);
      setColorState(convertedColor);

      // Store the color in localStorage
      localStorage.setItem("color", convertedColor);
    } catch (error) {
      console.error("Error fetching primary color:", error);
    }
  }, []);

  // Initialize theme and color from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "baseTheme";
    document.documentElement.setAttribute("data-theme", storedTheme);

    const storedColor = localStorage.getItem("color");
    if (storedColor) {
      setColorState(storedColor);
    } else {
      triggerColorUpdate();
    }
  }, [triggerColorUpdate]);

  return (
    <ColorContext.Provider value={{ color, setColor: triggerColorUpdate }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColorContext must be used within a ColorProvider");
  }
  return context;
};
