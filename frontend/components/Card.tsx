"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";

interface CardProps {
	title: string;
	description: string;
	imageSrc: string;
	link: string;
	buttonText: string;
}

export function Card({
	title,
	description,
	imageSrc,
	link,
	buttonText,
}: CardProps) {
	return (
		<CardContainer className="inter-var">
			<CardBody className="bg-[#BEE7DB] relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[22rem] h-auto rounded-xl p-4 border">
				{/* Title */}
				<CardItem
					translateZ="50"
					className="text-lg font-bold text-neutral-600 dark:text-white"
				>
					{title}
				</CardItem>

				{/* Description */}
				<CardItem
					as="p"
					translateZ="60"
					className="text-neutral-500 text-sm max-w-sm mt-1 dark:text-neutral-300"
				>
					{description}
				</CardItem>

				{/* Image */}
				<CardItem translateZ="100" className="w-full mt-4">
					<Image
						src={imageSrc}
						height="800"
						width="800"
						className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl"
						alt="thumbnail"
					/>
				</CardItem>

				{/* Action Buttons */}
				<div className="flex justify-between items-center mt-10">
					{/* Link */}
					<CardItem
						translateZ={20}
						as={Link}
						href={link}
						target="__blank"
						className="px-3 py-1 rounded-xl text-xs font-normal dark:text-white"
					>
						Try now →
					</CardItem>

					{/* Button */}
					<CardItem
						translateZ={20}
						as="button"
						className="px-3 py-1 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
					>
						{buttonText}
					</CardItem>
				</div>
			</CardBody>
		</CardContainer>
	);
}
