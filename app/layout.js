import "./globals.css";

export const metadata = {
  title: "Pugsie PA",
  description: "Your admin assistant for jobs, invoices and payments.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
