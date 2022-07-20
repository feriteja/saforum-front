import React, { createContext, useEffect, useState } from "react";

export type themeProps = "dark" | "light";
export type contextProps = {
  setTheme: React.Dispatch<React.SetStateAction<themeProps>>;
  theme: themeProps;
};

const getInitialTheme = (): themeProps => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme") || "light";

    if (!storedPrefs) {
      return "light";
    }

    const userMedia = window.matchMedia("(prefers-color-scheme:dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }
  return "light";
};

const ThemeContext = createContext<Partial<contextProps>>({});

const ThemeProvider: React.FC<{
  initialTheme?: themeProps;
  children: React.ReactNode;
}> = ({ initialTheme, children }) => {
  const [theme, setTheme] = useState<themeProps>(
    initialTheme || getInitialTheme
  );

  const rawSetTheme = (themeArg: themeProps) => {
    const root = window.document.documentElement;
    const isDark = themeArg === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(themeArg);

    localStorage.setItem("color-theme", themeArg);
  };

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
