import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://s3bglobal.com"),
  title: {
    default: "S3B Global | Next-Gen AI & Cloud Automation Solutions",
    template: "%s | S3B Global",
  },
  description: "S3B Global is your premier technology partner specializing in custom AI-powered innovations, cloud migration, modern web systems, and high-fidelity UI/UX design. Energy. Speed. Solution for Business.",
  keywords: ["AI Automation", "Cloud Architecture", "Custom Web Development", "UI/UX Design", "eCommerce Systems", "Enterprise Solutions"],
  authors: [{ name: "S3B Global" }],
  icons: {
    icon: "/s3b-logo-icon.png",
    shortcut: "/favicon.ico",
    apple: "/s3b-logo-icon.png",
  },
  openGraph: {
    title: "S3B Global | Next-Gen AI & Cloud Automation Solutions",
    description: "S3B Global is your premier technology partner specializing in custom AI-powered innovations, cloud migration, modern web systems, and high-fidelity UI/UX design.",
    url: "https://s3bglobal.com",
    siteName: "S3B Global",
    images: [
      {
        url: "/s3b-logo-dark.png",
        width: 1200,
        height: 630,
        alt: "S3B Global Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "S3B Global | Next-Gen AI & Cloud Automation Solutions",
    description: "S3B Global is your premier technology partner specializing in custom AI-powered innovations, cloud migration, modern web systems, and high-fidelity UI/UX design.",
    images: ["/s3b-logo-dark.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`light-mode ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem("s3b-theme");
                  if (savedTheme === "dark") {
                    document.documentElement.classList.remove("light-mode");
                  } else if (savedTheme === "light") {
                    document.documentElement.classList.add("light-mode");
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}

