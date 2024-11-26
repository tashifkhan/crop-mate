"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import States from "./States";
import StateDistricts from "./StateDistrict";
import Crops from "./Crops";
import seasons from "./seasons";
import { DialogBox } from "@/components/Dialogbox";

export default function () {
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
			const response = await axios.post(
				"https://cropmate-backend.onrender.com/predict_yield",
				formData,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status >= 200 && response.status < 300) {
				const data = response.data;

				if (data.predicted_production) {
					setDialogContent({
						title: "Predicted Yield & Production",
						content: `Predicted Production: ${Number(
							data.predicted_production
						).toFixed(2)}\nPredicted Yield: ${Number(
							data.predicted_yield
						).toFixed(2)}`,
					});
				} else {
					setDialogContent({
						title: "Error",
						content: data.error || "Could not determine the crop.",
					});
				}
			} else {
				setDialogContent({
					title: "Error",
					content: "Failed to get a valid response from the server",
				});
			}
		} catch (error) {
			setDialogContent({
				title: "Error",
				content: "Failed to predict the yield. Please try again.",
			});
		}
		setDialogOpen(true);
	};

	return (
		<div className="min-h-[48rem] flex items-center justify-center">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 w-[700px] mx-auto p-4 backdrop-blur-md bg-white/30 rounded-lg border border-white/40 shadow-lg"
			>
				{[
					{
						name: "State_Name",
						type: "select",
						options: states,
						disabled: false,
					},
					{
						name: "District_Name",
						type: "select",
						options: formData.State_Name
							? stateDistricts[formData.State_Name]
							: [],
						disabled: !formData.State_Name,
					},
					{
						name: "Crop_Year",
						type: "date",
					},
					{
						name: "Season",
						type: "select",
						options: seasons,
						disabled: false,
					},
					{
						name: "Crop",
						type: "select",
						options: crops,
						disabled: false,
					},
					{
						name: "Area",
						type: "number",
						placeholder: "Enter area in hectares",
					},
				].map((field) => (
					<div
						key={field.name}
						className="mx-auto w-[98%] h-[49px] backdrop-blur-sm bg-white/20 rounded-[10px] border border-white/40 p-2"
					>
						{field.type === "select" ? (
							<select
								name={field.name}
								value={formData[field.name as keyof typeof formData]}
								onChange={handleInputChange}
								disabled={field.disabled}
								className="w-[100%] bg-transparent rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[22px] font-semibold font-['Inter'] leading-[33px] placeholder-[#466459]/60"
							>
								<option value="">{`Select ${field.name.replace(
									/_/g,
									" "
								)}`}</option>
								{field.options?.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>
						) : field.type === "date" ? (
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
											value: date?.getFullYear().toString() || "",
										},
									} as React.ChangeEvent<HTMLInputElement>)
								}
								showYearPicker
								dateFormat="yyyy"
								className="w-full bg-transparent rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[22px] font-semibold font-['Inter'] leading-[33px] placeholder-[#466459]/60"
								placeholderText="Select crop year"
								maxDate={new Date()}
								yearItemNumber={6}
							/>
						) : (
							<input
								type={field.type}
								name={field.name}
								value={formData[field.name as keyof typeof formData]}
								onChange={handleInputChange}
								className="w-[100%] bg-transparent rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[22px] font-semibold font-['Inter'] leading-[33px] placeholder-[#466459]/60"
								placeholder={field.placeholder}
								required
							/>
						)}
					</div>
				))}
				<button
					type="submit"
					className="w-full h-[50px] bg-[#466459] text-white rounded-lg text-[18px] font-semibold hover:bg-[#3b524c] transition"
				>
					Predict Yield
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
}
