"use client";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import nominalYields from "./nomialYield";
import States from "../yield/States";
import StateDistricts from "../yield/StateDistrict";
import Crops from "../yield/Crops";
import seasons from "../yield/seasons";
import { DialogBox } from "@/components/Dialogbox";
import weatherPatterns from "./weatherPattern";

const InsurancePage = () => {
	const [formData, setFormData] = useState({
		State_Name: "",
		District_Name: "",
		Crop_Year: "",
		Season: "",
		Crop: "",
		Area: "",
		Production: "",
	});

	const [dialogOpen, setDialogOpen] = useState(false);
	const [dialogContent, setDialogContent] = useState({
		title: "",
		content: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			// Get weather pattern for selected state
			const stateWeather = weatherPatterns.find(
				(pattern) => pattern.name === formData.State_Name
			);

			if (!stateWeather) {
				throw new Error("Weather data not found for selected state");
			}

			// Make parallel API calls
			const [yieldResponse, weatherResponse] = await Promise.all([
				axios.post(
					"https://cropmate-backend.onrender.com/predict_yield",
					formData,
					{
						headers: { "Content-Type": "application/json" },
					}
				),
				axios.post(
					"https://cropmate-backend.onrender.com/weather",
					stateWeather
				),
			]);

			// Process yield prediction
			const yieldData = yieldResponse.data;
			const weatherData = weatherResponse.data;

			let dialogTitle = "Crop Assessment Results";
			let dialogContent = "";

			// Check yield prediction
			if (yieldData.predicted_production) {
				const nominalYield =
					formData.Crop in nominalYields
						? Number(
								nominalYields[formData.Crop as keyof typeof nominalYields]
						  ).toFixed(2)
						: "Not available";

				const isYieldBelowNominal =
					formData.Crop in nominalYields &&
					parseFloat(yieldData.predicted_yield) <
						nominalYields[formData.Crop as keyof typeof nominalYields];

				// Yield Assessment Section
				dialogContent = `📊 YIELD ASSESSMENT
				${isYieldBelowNominal ? "⚠️" : "✅"} Status: ${
					isYieldBelowNominal ? "Below" : "Above"
				} nominal yield
				• Nominal Yield: ${nominalYield}
				• Predicted Yield: ${yieldData.predicted_yield}
				• Predicted Production: ${yieldData.predicted_production}\n\n`;

				// Weather Assessment Section
				const highFloodRisk = weatherData.flood_risk.percentage > 60;
				const highDroughtRisk = weatherData.drought_risk.percentage - 67 > 60;

				dialogContent += `🌤️ WEATHER ASSESSMENT
				• Flood Risk: ${weatherData.flood_risk.percentage}% 
				• Drought Risk: ${
					weatherData.drought_risk.percentage - 67 < 0
						? -1 * (weatherData.drought_risk.percentage - 67)
						: weatherData.drought_risk.percentage - 67
				}% \n`;

				// Risk Recommendations
				if (highFloodRisk || highDroughtRisk) {
					dialogContent += "\n⚠️ HIGH RISK ALERTS:";
					if (highFloodRisk) {
						dialogContent += `\n• High flood risk detected (${weatherData.flood_risk.percentage}%)`;
					}
					if (highDroughtRisk) {
						dialogContent += `\n• High drought risk detected (${
							weatherData.drought_risk.percentage - 67 < 0
								? -1 * (weatherData.drought_risk.percentage - 67)
								: weatherData.drought_risk.percentage - 67
						}%)`;
					}
					dialogContent +=
						"\n\n🔔 RECOMMENDATION: Consider getting crop insurance due to high weather risks.";
				} else {
					dialogContent +=
						"\n🟢 LOW RISK ALERTS: No high risks detected.\nYou can skip insurance";
				}
			} else {
				dialogTitle = "Error";
				dialogContent = yieldData.error || "Could not process prediction";
			}

			setDialogContent({
				title: dialogTitle,
				content: dialogContent,
			});
			setDialogOpen(true);
		} catch (error) {
			console.error("Error:", error);
			setDialogContent({
				title: "Error",
				content: "Failed to process request. Please try again.",
			});
			setIsLoading(false);
			setDialogOpen(true);
		}
	};

	return (
		<div className="min-h-[50rem] flex items-center justify-center">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 w-[700px] mx-auto p-4 backdrop-blur-md bg-white/30 rounded-lg border border-white/40 shadow-lg "
			>
				{/* State Dropdown */}
				<div className="mx-auto w-[98%] h-[49px] backdrop-blur-sm bg-white/20 rounded-[10px] border border-white/40 p-2">
					<select
						id="State_Name"
						name="State_Name"
						value={formData.State_Name}
						onChange={handleInputChange}
						className="w-[100%] bg-transparent rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[18px] font-semibold font-['Inter'] leading-[33px]"
					>
						<option value="">Select State</option>
						{States.map((state) => (
							<option key={state} value={state}>
								{state}
							</option>
						))}
					</select>
				</div>

				{/* District Dropdown */}
				<div className="mx-auto w-[98%] h-[49px] backdrop-blur-sm bg-white/20 rounded-[10px] border border-white/40 p-2">
					<select
						id="District_Name"
						name="District_Name"
						value={formData.District_Name}
						onChange={handleInputChange}
						disabled={!formData.State_Name}
						className="w-[100%] bg-transparent rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[18px] font-semibold font-['Inter'] leading-[33px]"
					>
						<option value="">Select District</option>
						{formData.State_Name &&
							StateDistricts[formData.State_Name]?.map((district) => (
								<option key={district} value={district}>
									{district}
								</option>
							))}
					</select>
				</div>

				{/* Season Dropdown */}
				<div className="mx-auto w-[98%] h-[49px] backdrop-blur-sm bg-white/20 rounded-[10px] border border-white/40 p-2">
					<select
						id="Season"
						name="Season"
						value={formData.Season}
						onChange={handleInputChange}
						className="w-[100%] bg-transparent rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[18px] font-semibold font-['Inter'] leading-[33px]"
					>
						<option value="">Select Season</option>
						{seasons.map((season) => (
							<option key={season} value={season}>
								{season}
							</option>
						))}
					</select>
				</div>

				{/* Crop Dropdown */}
				<div className="mx-auto w-[98%] h-[49px] backdrop-blur-sm bg-white/20 rounded-[10px] border border-white/40 p-2">
					<select
						id="Crop"
						name="Crop"
						value={formData.Crop}
						onChange={handleInputChange}
						className="w-[100%] bg-transparent rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[18px] font-semibold font-['Inter'] leading-[33px]"
					>
						<option value="">Select Crop</option>
						{Crops.map((crop) => (
							<option key={crop} value={crop}>
								{crop}
							</option>
						))}
					</select>
				</div>

				{/* Area */}
				<div className="mx-auto w-[98%] h-[49px] backdrop-blur-sm bg-white/20 rounded-[10px] border border-white/40 p-2">
					<input
						type="number"
						id="Area"
						name="Area"
						value={formData.Area}
						onChange={handleInputChange}
						className="w-[100%] bg-transparent rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[18px] font-semibold font-['Inter'] leading-[33px]"
						placeholder="Enter area in hectares"
						required
					/>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="w-full h-[50px] bg-[#466459] text-white rounded-lg text-[18px] font-semibold hover:bg-[#3b524c] transition"
					disabled={isLoading}
				>
					{isLoading ? "Predicting..." : "Insurance Advice ?"}
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

export default InsurancePage;
