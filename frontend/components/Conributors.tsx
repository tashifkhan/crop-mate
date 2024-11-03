"use client";
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import imageSrc01 from "@/public/assets/02c.jpg";
import imageSrc02 from "@/public/assets/1699820074185.jpeg";

const people = [
	{
		id: 1,
		name: "Gauri Bahguguna",
		designation: "22102045",
		image: imageSrc01,
	},
	{
		id: 2,
		name: "Tashif Ahmad Khan",
		designation: "22102141",
		image: imageSrc02,
	},
];

export function AnimatedTooltipPreview() {
	return (
		<div className="flex flex-row items-center justify-center mb-10 w-full">
			<AnimatedTooltip items={people} />
		</div>
	);
}
