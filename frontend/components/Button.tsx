import { motion } from "framer-motion";
import React from "react";
import { useRouter } from "next/navigation";

interface ButtonProps {
	text: string;
	destination: string;
	style: string;
}

const Button = ({ text, destination, style }: ButtonProps) => {
	const router = useRouter();
	return (
		<motion.button
			className={style}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
			onClick={() => router.push(destination)}
		>
			{text}
		</motion.button>
	);
};

export default Button;
