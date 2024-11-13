"use client";
import Image from "next/image";
import { Card } from "@/components/Card";
import { AnimatedModalDemo } from "@/components/MovingButton";
import { AnimatedTooltipPreview } from "@/components/Conributors";
import { InfiniteMovingCardsDemo } from "@/components/Testimonials";

import image1 from "@/public/assets/1.png";
import image2 from "@/public/assets/2.jpg";
import image3 from "@/public/assets/3.jpg";

import React from "react";

export default function Home() {
	return (
		<>
			<div className="flex justify-center bg-[#9EC8B9]">
				<div className="w-[1643px] h-[1068px] bg-[#9EC8B9]">
					<div className="w-[310px] h-6 text-[#092635] text-[4rem] font-extrabold font-['Podkova'] leading-normal mx-auto">
						Crop Mate
					</div>
					<div className="mt-[4.2rem] flex flex-wrap gap-12 justify-center">
						<Card
							title="Crop Suggestion"
							description="It suggests you the crop which is most profitable for you"
							imageSrc={image1}
							link=""
							buttonText="Sign up"
						/>
						<Card
							title="Insurance Advisory"
							description="Any year given all the climatic as well as market conditions advices."
							imageSrc={image2}
							link=""
							buttonText="Sign up"
						/>
						<Card
							title="Yield Prediction"
							description="It predicts the yield of the crop you are going to grow"
							imageSrc={image3}
							link=""
							buttonText="Sign up"
						/>
					</div>
					{/* <div className="flex gap-2 justify-center pt-5">
						<div className="flex space-x-4">
							<Button text="Sign In" destination="/signin" />
							<Button text="Sign Up" destination="/signup" />
						</div>
					</div>
					<div className="pt-1 flex justify-center">
						<button className="bg-slate-700 text-white px-6 py-2 rounded-full">
							Support Chat
						</button>
					</div> */}
					<InfiniteMovingCardsDemo />
					<div className=" flex justify-center">
						<AnimatedTooltipPreview />
					</div>
				</div>
			</div>
		</>
	);
}
