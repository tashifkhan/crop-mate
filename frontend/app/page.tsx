"use client";
import { Card } from "@/components/Card";
import { AnimatedTooltipPreview } from "@/components/Conributors";
import { InfiniteMovingCardsDemo } from "@/components/Testimonials";

import image1 from "@/public/assets/1.png";
import image2 from "@/public/assets/2.jpg";
import image3 from "@/public/assets/3.jpg";

import React from "react";

export default function Home() {
	return (
		<>
			<div className="flex justify-center bg-[#9EC8B9] min-h-screen overflow-auto">
				<div className="w-[1643px] bg-[#9EC8B9]">
					<div className="w-[310px] h-6 text-[#092635] text-[4rem] font-extrabold font-['Podkova'] leading-normal mx-auto py-4 hidden sm:block">
						Crop Mate
					</div>
					<div className="mt-[4.2rem] md:flex md:flex-wrap md:gap-12 md:justify-center pt-6 flex-row">
						<Card
							title="Crop Suggestion"
							description="It suggests you the crop which is most profitable for you"
							imageSrc={image1}
							link="/suggestion"
							buttonText="Sign up"
						/>
						<Card
							title="Insurance Advisory"
							description="Any year given all the climatic as well as market conditions advices."
							imageSrc={image2}
							link="/insurance"
							buttonText="Sign up"
						/>
						<Card
							title="Yield Prediction"
							description="It predicts the yield of the crop you are going to grow"
							imageSrc={image3}
							link="/yield"
							buttonText="Sign up"
						/>
					</div>
					<InfiniteMovingCardsDemo />
					<div className="pb-20 md:pb-1">
						<AnimatedTooltipPreview />
					</div>
				</div>
			</div>
		</>
	);
}
