import "./globals.css";
import { connectToMongoDB } from "../lib/db";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  connectToMongoDB();
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
