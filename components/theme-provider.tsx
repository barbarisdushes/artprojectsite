"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Упрощенный интерфейс для ThemeProvider
interface ThemeProviderProps {
  children: React.ReactNode;
  [key: string]: any;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
} 