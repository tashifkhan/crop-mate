"use client";
import React, { useState } from "react";
import axios from "axios";
import { DialogBox } from "@/components/Dialogbox";

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
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		let newValue = value;

		// Validation for N, P, K: Ensure value is between 0 and 100
		if (["Nitrogen", "Phosphorus", "Potassium", "Humidity"].includes(name)) {
			newValue = Math.min(Math.max(0, parseFloat(value) || 0), 100).toString();
		}

		// Validation for Ph: Ensure value is betwen 0 and 14
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
		setIsLoading(true);

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
			setIsLoading(false);
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
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9EC8B9] to-blue-100">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 w-[700px] mx-auto p-8 
            backdrop-blur-lg bg-white/20 rounded-xl 
            border border-white/30 shadow-2xl
            hover:shadow-3xl transition-all duration-300"
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
						className="transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:-translate-y-1"
					>
						<div className="relative">
							<label className="block text-[#466459] font-medium mb-1 opacity-70">
								{field}
							</label>
							<input
								type="text"
								name={field}
								step="any"
								value={formData[field as keyof typeof formData]}
								onChange={handleChange}
								className="w-full p-3 bg-white/10 backdrop-blur-md rounded-xl 
                            border border-white/30 text-[#466459] focus:outline-none 
                            focus:border-white/50 transition-all duration-300"
								placeholder={`Enter ${field.toLowerCase()}`}
								required
							/>
						</div>
					</div>
				))}
				<button
					type="submit"
					className="w-full h-[50px] bg-[#466459] text-white rounded-lg text-[18px] font-semibold hover:bg-[#3b524c] transition"
				>
					Predict Crop
				</button>
			</form>
			{isLoading && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="loader"></div>
				</div>
			)}
			<DialogBox
				title={dialogContent.title}
				displayContent={dialogContent.content}
				isOpen={dialogOpen}
				onOpenChange={(isOpen) => {
					setDialogOpen(isOpen);
					if (!isOpen) {
						setIsLoading(false);
						setDialogContent({ title: "", content: "" });
					}
				}}
			/>
		</div>
	);
};

export default CropPredictionForm;
