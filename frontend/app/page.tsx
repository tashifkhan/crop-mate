"use client";
import Image from "next/image";
import { Card } from "@/components/Card";
import { AnimatedModalDemo } from "@/components/MovingButton";
import { AnimatedTooltipPreview } from "@/components/Conributors";
import { InfiniteMovingCardsDemo } from "@/components/Testimonials";

import { motion } from "framer-motion";
import { Link } from "lucide-react";

interface ButtonProps {
	text: string;
	destination: string;
}

const Button = ({ text, destination }: ButtonProps) => {
	return (
		<motion.button
			className="bg-black text-white px-6 py-2 rounded-full"
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
			onClick={() => Link.push(destination)}
		>
			{text}
		</motion.button>
	);
};

export default function Home() {
	return (
		<>
			<div className="flex flex-wrap gap-12 justify-center">
				<Card
					title="Crop Suggestion"
					description="It suggests you the crop which is most profitable for yuu"
					imageSrc="/public/assets/1.png"
					link=""
					buttonText="Sign up"
				/>
				<Card
					title="Insurance Advisory"
					description="Any year given all the climatic as well as market conditions advices."
					imageSrc="/public/assets/2.jpg"
					link=""
					buttonText="Sign up"
				/>
				<Card
					title="Yield Prediction"
					description="It predicts the yield of the crop you are going to grow"
					imageSrc="/public/assets/3.jpg"
					link=""
					buttonText="Sign up"
				/>
			</div>
			<div className="flex gap-2 justify-center pt-5">
				<div className="flex space-x-4">
					<Button text="Sign In" destination="/signin" />
					<Button text="Sign Up" destination="/signup" />
				</div>
			</div>
			<div className="pt-1 flex justify-center">
				<button className="bg-slate-700 text-white px-6 py-2 rounded-full">
					Support Chat
				</button>
			</div>
			<InfiniteMovingCardsDemo />
			<div className="pt-7 flex justify-center">
				<AnimatedTooltipPreview />
			</div>
		</>
	);
}
