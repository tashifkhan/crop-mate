"use client";
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import imageSrc from "@/assets/02c.jpg";
const people = [
	{
		id: 1,
		name: "Tashif Ahmad Khan",
		designation: "22102141",
		image: "",
	},
	{
		id: 2,
		name: "Gauri Bahguguna",
		designation: "22102045",
		image: "/public/assets/02c.jpg",
	},
];

export function AnimatedTooltipPreview() {
	return (
		<div className="flex flex-row items-center justify-center mb-10 w-full">
			<AnimatedTooltip items={people} />
		</div>
	);
}
