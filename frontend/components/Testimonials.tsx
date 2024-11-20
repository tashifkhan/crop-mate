"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
	return (
		<div className="h-[25rem] rounded-md flex flex-col antialiased bg-[#9EC8B9] dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
			<p className="text-3xl"> Testimonials </p>
			<InfiniteMovingCards
				items={testimonials}
				direction="right"
				speed="slow"
			/>
		</div>
	);
}

const testimonials = [
	{
		quote:
			"India’s average crop yield currently stands at only 2.6 tonnes per hectare, starkly lagging behind other agricultural powerhouses such as China, where average yields are as high as 5.7 tonnes per hectare.",
		name: "Charles Dickens",
		title: "Low Crop Yield",
	},
	{
		quote:
			"Indian agriculture is heavily dependent on monsoon rains, with over 60% of all cultivated land being rainfed. This reliance on natural precipitation makes Indian farmers especially susceptible to the vagaries of climate change.",
		name: "William Shakespeare",
		title: "Climate Vulnerability",
	},
	{
		quote:
			"Despite the inherent risks associated with farming, crop insurance remains significantly underutilised among Indian farmers, with only 23% covered by any form of crop insurance. .",
		name: "Edgar Allan Poe",
		title: "Financial Risks ",
	},
	{
		quote:
			"The Crop Recommendation Engine is the centerpiece of the solution, designed to help farmers choose the most profitable and suitable crops for their specific conditions. ",
		name: "Jane Austen",
		title: "Crop Recommendation Engine",
	},
	{
		quote:
			"Accurate yield predictions are essential for planning harvest schedules, resource allocation, and assessing potential .",
		name: "Herman Melville",
		title: "Yield Estimation",
	},
];
