"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import nominalYields from "./nomialYield";
import States from "../yield/States";
import StateDistricts from "../yield/StateDistrict";
import Crops from "../yield/Crops";
import seasons from "../yield/seasons";
import Dialogbox, { DialogBox } from "@/components/Dialogbox";

type Props = {};

export default function ({}: Props) {
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

					if (data.predicted_production) {
						if (
							formData.Crop in nominalYields &&
							parseFloat(data.predicted_yield) <
								parseFloat(
									nominalYields[formData.Crop as keyof typeof nominalYields]
								)
						) {
							setDialogContent({
								title: "Warning",
								content:
									"The predicted yield is below nominal yield for this crop.",
							});
							setDialogOpen(true);
						} else {
							setDialogContent({
								title: "Go Ahead",
								content: `Your Predicted Yield: ${data.predicted_yield}\n\nWhich is greater than the nominal yield for this crop.`,
							});
							setDialogOpen(true);
						}
					} else {
						setDialogContent({
							title: "Error",
							content: data.error || "Could not process prediction",
						});
						setDialogOpen(true);
					}
				} else {
					setDialogContent({
						title: "Error",
						content: "Failed to get a valid response from the server",
					});
					setDialogOpen(true);
				}
			} catch (error) {
				setDialogContent({
					title: "Error",
					content: "Failed to predict the yield. Please try again.",
				});
				setDialogOpen(true);
			}
		} catch (error) {
			console.error("Error:", error);
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
						{States.map((state) => (
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
							StateDistricts[formData.State_Name]?.map((district) => (
								<option key={district} value={district}>
									{district}
								</option>
							))}
					</select>
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
						{Crops.map((crop) => (
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
					Insurance Advice ?
				</button>
			</form>
			<DialogBox
				title={dialogContent.title}
				displayContent={dialogContent.content}
				isOpen={dialogOpen}
				onOpenChange={setDialogOpen}
			/>
		</>
	);
}
