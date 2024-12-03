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
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function YieldPage() {
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
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
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
		setIsLoading(false);
		setDialogOpen(true);
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
						className="transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:-translate-y-1"
					>
						{field.type === "select" ? (
							<div className="relative">
								<label className="block text-[#466459] font-medium mb-1 opacity-70">
									{field.name.replace(/_/g, " ")}
								</label>
								<select
									name={field.name}
									value={formData[field.name as keyof typeof formData]}
									onChange={handleInputChange}
									disabled={field.disabled}
									className="w-full p-3 bg-white/10 backdrop-blur-md rounded-xl 
									border border-white/30 text-[#466459] focus:outline-none 
									focus:border-white/50 transition-all duration-300"
								>
									<option value="">
										{`Select ${field.name.replace(/_/g, " ")}`}
									</option>
									{field.options?.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							</div>
						) : field.type === "date" ? (
							<div className="relative">
								<label className="block text-[#466459] font-medium mb-1 opacity-70">
									Crop Year
								</label>
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
									className="w-full p-3 bg-white/10 backdrop-blur-md rounded-xl 
									border border-white/30 text-[#466459] focus:outline-none 
									focus:border-white/50 transition-all duration-300"
									maxDate={new Date()}
									yearItemNumber={6}
								/>
							</div>
						) : (
							<div className="relative">
								<label className="block text-[#466459] font-medium mb-1 opacity-70">
									{field.name.replace(/_/g, " ")}
								</label>
								<input
									type={field.type}
									name={field.name}
									value={formData[field.name as keyof typeof formData]}
									onChange={handleInputChange}
									placeholder={field.placeholder}
									required
									className="w-full p-3 bg-white/10 backdrop-blur-md rounded-xl 
									border border-white/30 text-[#466459] focus:outline-none 
									focus:border-white/50 transition-all duration-300"
								/>
							</div>
						)}
					</div>
				))}
				<button
					type="submit"
					className="w-full h-[50px] bg-[#466459] text-white rounded-lg text-[18px] font-semibold hover:bg-[#3b524c] transition"
					disabled={isLoading}
				>
					{isLoading ? "Predicting..." : "Predict Yield"}
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
						setDialogContent({ title: "", content: "" });
					}
				}}
			/>
		</div>
	);
}
