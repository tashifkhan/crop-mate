"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import States from "./States";
import StateDistricts from "./StateDistrict";
import Crops from "./Crops";
import seasons from "./seasons";

type Props = {};

export default function ({}: Props) {
	const states = States;
	const stateDistricts = StateDistricts;
	const crops = Crops;

	const [formData, setFormData] = useState({
		State_Name: "",
		District_Name: "",
		Crop_Year: "",
		Season: "",
		Crop: "",
		Area: "",
		Production: "",
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			console.log(formData);
			try {
				const response = await axios.post(
					"http://127.0.0.1:5000/predict_yield",
					formData,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				console.log(response);

				// Check if the response status is in the success range (200-299)
				if (response.status >= 200 && response.status < 300) {
					const data = response.data;

					// Assuming the Flask backend returns 'crop' and 'message' in the response
					if (data.predicted_production) {
						alert(
							`Predicted Production: ${data.predicted_production}\nPredicted Yield: ${data.predicted_yield}`
						);
					} else {
						alert("Error: " + (data.error || "Could not determine the crop."));
					}
				} else {
					throw new Error("Failed to get a valid response from the server");
				}
			} catch (error) {
				console.error("Error submitting the form", error);
				alert("Failed to predict the yield. Please try again.");
			}
		} catch (error) {
			console.error("Error submitting the form", error);
			alert("Failed to predict the yield. Please try again.");
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 w-[700px] mt-9 mx-auto p-4 bg-[#f5f9f7] rounded-lg border border-[#466459]/40"
			>
				{/* State Dropdown */}
				<div className="mx-auto w-[98%] h-[49px] bg-[#dbeee8] rounded-[10px] border border-[#466459]/40 p-2">
					<select
						id="State_Name"
						name="State_Name"
						value={formData.State_Name}
						onChange={handleInputChange}
						className="w-[100%] bg-[#dbeee8] rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[#486258]/60 text-[22px] font-semibold font-['Inter'] leading-[33px]"
					>
						<option value="">Select State</option>
						{states.map((state) => (
							<option key={state} value={state}>
								{state}
							</option>
						))}
					</select>
				</div>

				{/* District Dropdown */}
				<div className="mx-auto w-[98%] h-[49px] bg-[#dbeee8] rounded-[10px] border border-[#466459]/40 p-2">
					<select
						id="District_Name"
						name="District_Name"
						value={formData.District_Name}
						onChange={handleInputChange}
						disabled={!formData.State_Name}
						className="w-[100%] bg-[#dbeee8] rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[#486258]/60 text-[22px] font-semibold font-['Inter'] leading-[33px]"
					>
						<option value="">Select District</option>
						{formData.State_Name &&
							stateDistricts[formData.State_Name]?.map((district) => (
								<option key={district} value={district}>
									{district}
								</option>
							))}
					</select>
				</div>

				{/* Crop Year */}
				<div className="mx-auto w-[98%] h-[49px] bg-[#dbeee8] rounded-[10px] border border-[#466459]/40 p-2">
					<DatePicker
						selected={
							formData.Crop_Year
								? new Date(Number(formData.Crop_Year), 0)
								: null
						}
						onChange={(date) =>
							handleInputChange({
								target: {
									name: "Crop_Year",
									value: date.getFullYear().toString(),
								},
							})
						}
						showYearPicker
						dateFormat="yyyy"
						className="w-[620px] bg-[#dbeee8] rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[#486258]/60 text-[22px] font-semibold font-['Inter'] leading-[33px]"
						placeholderText="Enter crop year"
					/>
				</div>

				{/* Season Dropdown */}
				<div className="mx-auto w-[98%] h-[49px] bg-[#dbeee8] rounded-[10px] border border-[#466459]/40 p-2">
					<select
						id="Season"
						name="Season"
						value={formData.Season}
						onChange={handleInputChange}
						className="w-[100%] bg-[#dbeee8] rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[#486258]/60 text-[22px] font-semibold font-['Inter'] leading-[33px]"
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
				<div className="mx-auto w-[98%] h-[49px] bg-[#dbeee8] rounded-[10px] border border-[#466459]/40 p-2">
					<select
						id="Crop"
						name="Crop"
						value={formData.Crop}
						onChange={handleInputChange}
						className="w-[100%] bg-[#dbeee8] rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[#486258]/60 text-[22px] font-semibold font-['Inter'] leading-[33px]"
					>
						<option value="">Select Crop</option>
						{crops.map((crop) => (
							<option key={crop} value={crop}>
								{crop}
							</option>
						))}
					</select>
				</div>

				{/* Area */}
				<div className="mx-auto w-[98%] h-[49px] bg-[#dbeee8] rounded-[10px] border border-[#466459]/40 p-2">
					<input
						type="number"
						id="Area"
						name="Area"
						value={formData.Area}
						onChange={handleInputChange}
						className="w-[100%] bg-[#dbeee8] rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[#486258]/60 text-[22px] font-semibold font-['Inter'] leading-[33px]"
						placeholder="Enter area in hectares"
						required
					/>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="w-full h-[50px] bg-[#466459] text-white rounded-lg text-[18px] font-semibold hover:bg-[#3b524c] transition"
				>
					Predict Yield
				</button>
			</form>
		</>
	);
}
