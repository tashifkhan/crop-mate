import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

import { Inter } from "next/font/google";
import Navbar from "@/components/NavBar";
import "./globals.css";
import React from "react";
import SupportChat from "@/components/supportchat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "CropMate",
	description: "Created with Next.js",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Navbar />
				<main className="">{children}</main>
				<SupportChat />
			</body>
		</html>
	);
}
