"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Button from "@/components/Button";

export function display_logo() {
	return (
		<div className="flex-shrink-0 flex items-center">
			<Link href="/" className="text-xl font-bold text-gray-800">
				Logo
			</Link>
		</div>
	);
}

const Navbar = () => {
	const isAuth = true;
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	const navigationItems = [
		{ name: "Home", href: "/" },
		{ name: "Crop Suggestion", href: "/suggestion" },
		{ name: "Insurance Advisory", href: "/insurance" },
		{ name: "Yield Estimation", href: "/yield" },
		{ name: "Support Chat", href: "/support" },
	];

	return (
		<nav className="bg-[#dbeee8] shadow-lg">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<div className="flex-shrink-0 flex items-center">
						<Link href="/" className="text-xl font-bold text-gray-800">
							CropMate
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex space-x-8">
						{navigationItems.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
									pathname === item.href
										? "text-[#42626b] bg-blue-50"
										: "text-gray-600 hover:text-gray-900"
								}`}
							>
								{item.name}
							</Link>
						))}
					</div>
					{!isAuth && (
						<div className="flex gap-2 justify-center">
							<div className="flex space-x-4">
								<Button
									text="Sign In"
									destination="/signin"
									style="bg-[#86a69a] rounded-[0.5rem] text-white p-1 px-2"
								/>
								<Button
									text="Sign Up"
									destination="/signup"
									style="bg-[#486258] rounded-[0.5rem] text-white p-1 px-2"
								/>
							</div>
						</div>
					)}

					{/* Mobile Menu Button */}
					<div className="md:hidden flex items-center">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
						>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isOpen && (
					<div className="md:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							{navigationItems.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
										pathname === item.href
											? "text-blue-600 bg-blue-50"
											: "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
									}`}
								>
									{item.name}
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
