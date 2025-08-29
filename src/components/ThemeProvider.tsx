'use client';

import * as React from 'react';
import {ThemeProvider as NextThemesProvider} from 'next-themes';

type DataAttribute = `data-${string}`;
type Attribute = DataAttribute | 'class';

interface ValueObject {
  [themeName: string]: string;
}

interface ScriptProps
  extends React.DetailedHTMLProps<
    React.ScriptHTMLAttributes<HTMLScriptElement>,
    HTMLScriptElement
  > {
  [dataAttribute: DataAttribute]: unknown;
}

interface CustomThemeProviderProps extends React.PropsWithChildren {
  themes?: string[];
  forcedTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  enableColorScheme?: boolean;
  storageKey?: string;
  defaultTheme?: string;
  attribute?: Attribute | Attribute[];
  value?: ValueObject;
  nonce?: string;
  scriptProps?: ScriptProps;
}

export function ThemeProvider({children, ...props}: CustomThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
