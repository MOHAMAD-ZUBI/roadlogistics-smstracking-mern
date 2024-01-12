import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "../components/Provider";

import { getServerSession } from "next-auth";
import AdminLayout from "../components/shared/AdminLayout";
import { options } from "./api/auth/[...nextauth]/options";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Road SMS Tracking ",
  description: "Rodaco sms tracking app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <AdminLayout>{children}</AdminLayout>
        </Provider>
      </body>
    </html>
  );
}
