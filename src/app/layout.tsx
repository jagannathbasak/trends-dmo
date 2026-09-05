import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/ModalProvider";
import RequestAccessModal from "@/components/RequestAccessModal";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "NVILE — See what is coming before you make the decision",
  description:
    "NVILE detects the signals, explains why they are moving, forecasts where they lead, and tells you what to do about it — with every number labelled by how much we actually know.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${instrumentSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <ModalProvider>
          {children}
          <RequestAccessModal />
        </ModalProvider>
      </body>
    </html>
  );
}
