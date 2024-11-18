"use client";
import React, { useState } from "react";

const CropPredictionForm: React.FC = () => {
	const crops = {
		1: "Rice",
		2: "Maize",
		3: "Jute",
		4: "Cotton",
		5: "Coconut",
		6: "Papaya",
		7: "Orange",
		8: "Apple",
		9: "Muskmelon",
		10: "Watermelon",
		11: "Grapes",
		12: "Mango",
		13: "Banana",
		14: "Pomegranate",
		15: "Lentil",
		16: "Blackgram",
		17: "Mungbean",
		18: "Mothbeans",
		19: "Pigeonpeas",
		20: "Kidneybeans",
		21: "Chickpea",
		22: "Coffee",
		23: "Wheat",
	};

	const [formData, setFormData] = useState({
		Nitrogen: "",
		Phosphorus: "",
		Potassium: "",
		Temperature: "",
		Humidity: "",
		Ph: "",
		Rainfall: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		let newValue = value;

		// Validation for N, P, K: Ensure value is between 0 and 100
		if (["Nitrogen", "Phosphorus", "Potassium", "Humidity"].includes(name)) {
			newValue = Math.min(Math.max(0, parseFloat(value) || 0), 100).toString();
		}

		// Validation for Ph: Ensure value is between 0 and 14
		if (name === "Ph") {
			newValue = Math.min(Math.max(0, parseFloat(value) || 0), 14).toString();
		}

		setFormData({ ...formData, [name]: newValue });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:5000/predict", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();
			alert(data.result);
		} catch (error) {
			console.error("Error submitting the form", error);
			alert("Failed to predict the crop. Please try again.");
		}
	};

	return (
		<div className="">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 w-[700px] mt-9 mx-auto p-4 bg-[#f5f9f7] rounded-lg border border-[#466459]/40"
			>
				{[
					"Nitrogen",
					"Phosphorus",
					"Potassium",
					"Temperature",
					"Humidity",
					"Ph",
					"Rainfall",
				].map((field) => (
					<div
						key={field}
						className="mx-auto w-[98%] h-[49px] bg-[#dbeee8] rounded-[10px] border border-[#466459]/40 p-2"
					>
						<input
							type="text"
							name={field}
							value={(formData as any)[field]} // TS workaround for dynamic key access
							onChange={handleChange}
							className="w-[100%] bg-[#dbeee8] rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[#486258]/60 text-[22px] font-semibold font-['Inter'] leading-[33px]"
							placeholder={field}
							required
						/>
					</div>
				))}
				<button
					type="submit"
					className="w-full h-[50px] bg-[#466459] text-white rounded-lg text-[18px] font-semibold hover:bg-[#3b524c] transition"
				>
					Predict Crop
				</button>
			</form>
		</div>
	);
};

export default CropPredictionForm;
