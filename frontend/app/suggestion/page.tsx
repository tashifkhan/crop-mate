"use client";
import React, { useState } from "react";
import axios from "axios";
import Dialogbox, { DialogBox } from "@/components/Dialogbox";

const CropPredictionForm: React.FC = () => {
	const [formData, setFormData] = useState({
		Nitrogen: "",
		Phosphorus: "",
		Potassium: "",
		Temperature: "",
		Humidity: "",
		Ph: "",
		Rainfall: "",
	});

	const [dialogOpen, setDialogOpen] = useState(false);
	const [dialogContent, setDialogContent] = useState({
		title: "",
		content: "",
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

		// Ensure input is valid number before updating the state
		if (value === "" || !isNaN(parseFloat(value))) {
			setFormData({ ...formData, [name]: newValue });
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Convert form data to floats before sending to the server
		const floatData = {
			Nitrogen: parseFloat(formData.Nitrogen),
			Phosphorus: parseFloat(formData.Phosphorus),
			Potassium: parseFloat(formData.Potassium),
			Temperature: parseFloat(formData.Temperature),
			Humidity: parseFloat(formData.Humidity),
			Ph: parseFloat(formData.Ph),
			Rainfall: parseFloat(formData.Rainfall),
		};

		if (Object.values(floatData).some((value) => isNaN(value))) {
			setDialogContent({
				title: "Error",
				content: "Please fill in all fields with valid numbers.",
			});
			setDialogOpen(true);
			return;
		}

		try {
			console.log(floatData);
			try {
				const response = await axios.post(
					"https://cropmate-backend.onrender.com/predict",
					floatData,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				// Check if the response status is in the success range (200-299)
				if (response.status >= 200 && response.status < 300) {
					const data = response.data;

					// Assuming the Flask backend returns 'crop' and 'message' in the response
					if (data.crop) {
						setDialogContent({
							title: "Recommended Crop:",
							content: `${data.crop}`,
						});
						setDialogOpen(true);
						// alert(`Predicted crop: ${data.crop}\nMessage: ${data.message}`);
					} else {
						setDialogContent({
							title: "Error:",
							content:
								"Error: " + (data.error || "Could not determine the crop."),
						});
						setDialogOpen(true);
						// alert("Error: " + (data.error || "Could not determine the crop."));
					}
				} else {
					throw new Error("Failed to get a valid response from the server");
				}
			} catch (error) {
				console.error("Error submitting the form", error);
				setDialogContent({
					title: "Error:",
					content: "Failed to predict the crop. Please try again.",
				});
				// alert("Failed to predict the crop. Please try again.");
			}
		} catch (error) {
			console.error("Error submitting the form", error);
			setDialogContent({
				title: "Error:",
				content: "Failed to predict the crop. Please try again.",
			});
			// alert("Failed to predict the crop. Please try again.");
		}
	};

	return (
		<div className="min-h-[55rem] flex items-center justify-center">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 w-[700px] mx-auto p-4 backdrop-blur-md bg-white/30 rounded-lg border border-white/40 shadow-lg"
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
						className="mx-auto w-[98%] h-[49px] backdrop-blur-sm bg-white/20 rounded-[10px] border border-white/40 p-2"
					>
						<input
							type="text"
							name={field}
							step="any"
							value={(formData as any)[field]}
							onChange={handleChange}
							className="w-[100%] bg-transparent rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[22px] font-semibold font-['Inter'] leading-[33px] placeholder-[#466459]/60"
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
			<DialogBox
				title={dialogContent.title}
				displayContent={dialogContent.content}
				isOpen={dialogOpen}
				onOpenChange={setDialogOpen}
			/>
		</div>
	);
};

export default CropPredictionForm;
