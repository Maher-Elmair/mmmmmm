import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Pomodoro",
  description: "Pomodoro & focus dashboard.",
  openGraph: {
    title: "Pomodoro",
    description: "Pomodoro & focus dashboard.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f97316",
};

// Inline script: applies the persisted theme synchronously before first paint
// so there's no light/dark flash on refresh. Reads the zustand persist payload
// at `focusflow-storage` (key matches store config).
const THEME_PREHYDRATE = `
(function(){try{
  var raw=localStorage.getItem('focusflow-storage');
  var theme='dark';
  if(raw){var p=JSON.parse(raw); theme=(p&&p.state&&p.state.settings&&p.state.settings.theme)||'dark';}
  var dark = theme==='dark' || (theme==='system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  var c=document.documentElement.classList;
  if(dark) c.add('dark'); else c.remove('dark');
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
}catch(e){document.documentElement.classList.add('dark');}})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_PREHYDRATE }} />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
