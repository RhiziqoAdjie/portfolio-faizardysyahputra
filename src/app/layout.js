import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LangProvider } from "@/context/LangContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlueprintBg from "@/components/BlueprintBg";
import { getProfile } from "@/lib/dataStore";

export const metadata = {
  title: "Civil Engineer Portfolio",
  description: "Portofolio profesional Teknik Sipil — struktur, proyek, pengalaman, dan sertifikasi.",
};

export default async function RootLayout({ children }) {
  const profile = await getProfile().catch(() => null);

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = window.localStorage.getItem('portfolio-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored || (prefersDark ? 'dark' : 'light');
                  if (theme === 'dark') document.documentElement.classList.add('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LangProvider>
            <BlueprintBg>
              <Navbar />
              <main className="mx-auto min-h-[70vh] max-w-6xl px-5 py-10 lg:px-8">{children}</main>
              <Footer profile={profile} />
            </BlueprintBg>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
