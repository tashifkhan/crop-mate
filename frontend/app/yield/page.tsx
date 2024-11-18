"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

type Props = {};

export default function ({}: Props) {
	const states = [
		"Andaman and Nicobar Islands",
		"Andhra Pradesh",
		"Arunachal Pradesh",
		"Assam",
		"Bihar",
		"Chandigarh",
		"Chhattisgarh",
		"Dadra and Nagar Haveli",
		"Goa",
		"Gujarat",
		"Haryana",
		"Himachal Pradesh",
		"Jammu and Kashmir ",
		"Jharkhand",
		"Karnataka",
		"Kerala",
		"Madhya Pradesh",
		"Maharashtra",
		"Manipur",
		"Meghalaya",
		"Mizoram",
		"Nagaland",
		"Odisha",
		"Puducherry",
		"Punjab",
		"Rajasthan",
		"Sikkim",
		"Tamil Nadu",
		"Telangana ",
		"Tripura",
		"Uttar Pradesh",
		"Uttarakhand",
		"West Bengal",
	];

	const stateDistricts: Record<string, string[]> = {
		"Andaman and Nicobar Islands": [
			"NICOBARS",
			"NORTH AND MIDDLE ANDAMAN",
			"SOUTH ANDAMANS",
		],
		"Andhra Pradesh": [
			"ANANTAPUR",
			"CHITTOOR",
			"EAST GODAVARI",
			"GUNTUR",
			"KADAPA",
			"KRISHNA",
			"KURNOOL",
			"PRAKASAM",
			"SPSR NELLORE",
			"SRIKAKULAM",
			"VISAKHAPATANAM",
			"VIZIANAGARAM",
			"WEST GODAVARI",
		],
		"Arunachal Pradesh": [
			"ANJAW",
			"CHANGLANG",
			"DIBANG VALLEY",
			"EAST KAMENG",
			"EAST SIANG",
			"KURUNG KUMEY",
			"LOHIT",
			"LONGDING",
			"LOWER DIBANG VALLEY",
			"LOWER SUBANSIRI",
			"NAMSAI",
			"PAPUM PARE",
			"TAWANG",
			"TIRAP",
			"UPPER SIANG",
			"UPPER SUBANSIRI",
			"WEST KAMENG",
			"WEST SIANG",
		],
		Assam: [
			"BAKSA",
			"BARPETA",
			"BONGAIGAON",
			"CACHAR",
			"CHIRANG",
			"DARRANG",
			"DHEMAJI",
			"DHUBRI",
			"DIBRUGARH",
			"DIMA HASAO",
			"GOALPARA",
			"GOLAGHAT",
			"HAILAKANDI",
			"JORHAT",
			"KAMRUP",
			"KAMRUP METRO",
			"KARBI ANGLONG",
			"KARIMGANJ",
			"KOKRAJHAR",
			"LAKHIMPUR",
			"MARIGAON",
			"NAGAON",
			"NALBARI",
			"SIVASAGAR",
			"SONITPUR",
			"TINSUKIA",
			"UDALGURI",
		],
		Bihar: [
			"ARARIA",
			"ARWAL",
			"AURANGABAD",
			"BANKA",
			"BEGUSARAI",
			"BHAGALPUR",
			"BHOJPUR",
			"BUXAR",
			"DARBHANGA",
			"GAYA",
			"GOPALGANJ",
			"JAMUI",
			"JEHANABAD",
			"KAIMUR (BHABUA)",
			"KATIHAR",
			"KHAGARIA",
			"KISHANGANJ",
			"LAKHISARAI",
			"MADHEPURA",
			"MADHUBANI",
			"MUNGER",
			"MUZAFFARPUR",
			"NALANDA",
			"NAWADA",
			"PASHCHIM CHAMPARAN",
			"PATNA",
			"PURBI CHAMPARAN",
			"PURNIA",
			"ROHTAS",
			"SAHARSA",
			"SAMASTIPUR",
			"SARAN",
			"SHEIKHPURA",
			"SHEOHAR",
			"SITAMARHI",
			"SIWAN",
			"SUPAUL",
			"VAISHALI",
		],
		Chandigarh: ["CHANDIGARH"],
		Chhattisgarh: [
			"BALOD",
			"BALODA BAZAR",
			"BALRAMPUR",
			"BASTAR",
			"BEMETARA",
			"BIJAPUR",
			"BILASPUR",
			"DANTEWADA",
			"DHAMTARI",
			"DURG",
			"GARIYABAND",
			"JANJGIR-CHAMPA",
			"JASHPUR",
			"KABIRDHAM",
			"KANKER",
			"KONDAGAON",
			"KORBA",
			"KOREA",
			"MAHASAMUND",
			"MUNGELI",
			"NARAYANPUR",
			"RAIGARH",
			"RAIPUR",
			"RAJNANDGAON",
			"SUKMA",
			"SURAJPUR",
			"SURGUJA",
		],
		"Dadra and Nagar Haveli": ["DADRA AND NAGAR HAVELI"],
		Goa: ["NORTH GOA", "SOUTH GOA"],
		Gujarat: [
			"AHMADABAD",
			"AMRELI",
			"ANAND",
			"BANAS KANTHA",
			"BHARUCH",
			"BHAVNAGAR",
			"DANG",
			"DOHAD",
			"GANDHINAGAR",
			"JAMNAGAR",
			"JUNAGADH",
			"KACHCHH",
			"KHEDA",
			"MAHESANA",
			"NARMADA",
			"NAVSARI",
			"PANCH MAHALS",
			"PATAN",
			"PORBANDAR",
			"RAJKOT",
			"SABAR KANTHA",
			"SURAT",
			"SURENDRANAGAR",
			"TAPI",
			"VADODARA",
			"VALSAD",
		],
		Haryana: [
			"AMBALA",
			"BHIWANI",
			"FARIDABAD",
			"FATEHABAD",
			"GURGAON",
			"HISAR",
			"JHAJJAR",
			"JIND",
			"KAITHAL",
			"KARNAL",
			"KURUKSHETRA",
			"MAHENDRAGARH",
			"MEWAT",
			"PALWAL",
			"PANCHKULA",
			"PANIPAT",
			"REWARI",
			"ROHTAK",
			"SIRSA",
			"SONIPAT",
			"YAMUNANAGAR",
		],
		"Himachal Pradesh": [
			"BILASPUR",
			"CHAMBA",
			"HAMIRPUR",
			"KANGRA",
			"KINNAUR",
			"KULLU",
			"LAHUL AND SPITI",
			"MANDI",
			"SHIMLA",
			"SIRMAUR",
			"SOLAN",
			"UNA",
		],
		"Jammu and Kashmir ": [
			"ANANTNAG",
			"BADGAM",
			"BANDIPORA",
			"BARAMULLA",
			"DODA",
			"GANDERBAL",
			"JAMMU",
			"KARGIL",
			"KATHUA",
			"KISHTWAR",
			"KULGAM",
			"KUPWARA",
			"LEH LADAKH",
			"POONCH",
			"PULWAMA",
			"RAJAURI",
			"RAMBAN",
			"REASI",
			"SAMBA",
			"SHOPIAN",
			"SRINAGAR",
			"UDHAMPUR",
		],
		Jharkhand: [
			"BOKARO",
			"CHATRA",
			"DEOGHAR",
			"DHANBAD",
			"DUMKA",
			"EAST SINGHBUM",
			"GARHWA",
			"GIRIDIH",
			"GODDA",
			"GUMLA",
			"HAZARIBAGH",
			"JAMTARA",
			"KHUNTI",
			"KODERMA",
			"LATEHAR",
			"LOHARDAGA",
			"PAKUR",
			"PALAMU",
			"RAMGARH",
			"RANCHI",
			"SAHEBGANJ",
			"SARAIKELA KHARSAWAN",
			"SIMDEGA",
			"WEST SINGHBHUM",
		],
		Karnataka: [
			"BAGALKOT",
			"BANGALORE RURAL",
			"BELGAUM",
			"BELLARY",
			"BENGALURU URBAN",
			"BIDAR",
			"BIJAPUR",
			"CHAMARAJANAGAR",
			"CHIKBALLAPUR",
			"CHIKMAGALUR",
			"CHITRADURGA",
			"DAKSHIN KANNAD",
			"DAVANGERE",
			"DHARWAD",
			"GADAG",
			"GULBARGA",
			"HASSAN",
			"HAVERI",
			"KODAGU",
			"KOLAR",
			"KOPPAL",
			"MANDYA",
			"MYSORE",
			"RAICHUR",
			"RAMANAGARA",
			"SHIMOGA",
			"TUMKUR",
			"UDUPI",
			"UTTAR KANNAD",
			"YADGIR",
		],
		Kerala: [
			"ALAPPUZHA",
			"ERNAKULAM",
			"IDUKKI",
			"KANNUR",
			"KASARAGOD",
			"KOLLAM",
			"KOTTAYAM",
			"KOZHIKODE",
			"MALAPPURAM",
			"PALAKKAD",
			"PATHANAMTHITTA",
			"THIRUVANANTHAPURAM",
			"THRISSUR",
			"WAYANAD",
		],
		"Madhya Pradesh": [
			"AGAR MALWA",
			"ALIRAJPUR",
			"ANUPPUR",
			"ASHOKNAGAR",
			"BALAGHAT",
			"BARWANI",
			"BETUL",
			"BHIND",
			"BHOPAL",
			"BURHANPUR",
			"CHHATARPUR",
			"CHHINDWARA",
			"DAMOH",
			"DATIA",
			"DEWAS",
			"DHAR",
			"DINDORI",
			"GUNA",
			"GWALIOR",
			"HARDA",
			"HOSHANGABAD",
			"INDORE",
			"JABALPUR",
			"JHABUA",
			"KATNI",
			"KHANDWA",
			"KHARGONE",
			"MANDLA",
			"MANDSAUR",
			"MORENA",
			"NARSINGHPUR",
			"NEEMUCH",
			"PANNA",
			"RAISEN",
			"RAJGARH",
			"RATLAM",
			"REWA",
			"SAGAR",
			"SATNA",
			"SEHORE",
			"SEONI",
			"SHAHDOL",
			"SHAJAPUR",
			"SHEOPUR",
			"SHIVPURI",
			"SIDHI",
			"SINGRAULI",
			"TIKAMGARH",
			"UJJAIN",
			"UMARIA",
			"VIDISHA",
		],
		Maharashtra: [
			"AHMEDNAGAR",
			"AKOLA",
			"AMRAVATI",
			"AURANGABAD",
			"BEED",
			"BHANDARA",
			"BULDHANA",
			"CHANDRAPUR",
			"DHULE",
			"GADCHIROLI",
			"GONDIA",
			"HINGOLI",
			"JALGAON",
			"JALNA",
			"KOLHAPUR",
			"LATUR",
			"MUMBAI",
			"NAGPUR",
			"NANDED",
			"NANDURBAR",
			"NASHIK",
			"OSMANABAD",
			"PALGHAR",
			"PARBHANI",
			"PUNE",
			"RAIGAD",
			"RATNAGIRI",
			"SANGLI",
			"SATARA",
			"SINDHUDURG",
			"SOLAPUR",
			"THANE",
			"WARDHA",
			"WASHIM",
			"YAVATMAL",
		],
		Manipur: [
			"BISHNUPUR",
			"CHANDEL",
			"CHURACHANDPUR",
			"IMPHAL EAST",
			"IMPHAL WEST",
			"SENAPATI",
			"TAMENGLONG",
			"THOUBAL",
			"UKHRUL",
		],
		Meghalaya: [
			"EAST GARO HILLS",
			"EAST JAINTIA HILLS",
			"EAST KHASI HILLS",
			"NORTH GARO HILLS",
			"RI BHOI",
			"SOUTH GARO HILLS",
			"SOUTH WEST GARO HILLS",
			"SOUTH WEST KHASI HILLS",
			"WEST GARO HILLS",
			"WEST JAINTIA HILLS",
			"WEST KHASI HILLS",
		],
		Mizoram: [
			"AIZAWL",
			"CHAMPHAI",
			"KOLASIB",
			"LAWNGTLAI",
			"LUNGLEI",
			"MAMIT",
			"SAIHA",
			"SERCHHIP",
		],
		Nagaland: [
			"DIMAPUR",
			"KIPHIRE",
			"KOHIMA",
			"LONGLENG",
			"MOKOKCHUNG",
			"MON",
			"PEREN",
			"PHEK",
			"TUENSANG",
			"WOKHA",
			"ZUNHEBOTO",
		],
		Odisha: [
			"ANUGUL",
			"BALANGIR",
			"BALESHWAR",
			"BARGARH",
			"BHADRAK",
			"BOUDH",
			"CUTTACK",
			"DEOGARH",
			"DHENKANAL",
			"GAJAPATI",
			"GANJAM",
			"JAGATSINGHAPUR",
			"JAJAPUR",
			"JHARSUGUDA",
			"KALAHANDI",
			"KANDHAMAL",
			"KENDRAPARA",
			"KENDUJHAR",
			"KHORDHA",
			"KORAPUT",
			"MALKANGIRI",
			"MAYURBHANJ",
			"NABARANGPUR",
			"NAYAGARH",
			"NUAPADA",
			"PURI",
			"RAYAGADA",
			"SAMBALPUR",
			"SONEPUR",
			"SUNDARGARH",
		],
		Puducherry: ["KARAIKAL", "MAHE", "PONDICHERRY", "YANAM"],
		Punjab: [
			"AMRITSAR",
			"BARNALA",
			"BATHINDA",
			"FARIDKOT",
			"FATEHGARH SAHIB",
			"FAZILKA",
			"FIROZEPUR",
			"GURDASPUR",
			"HOSHIARPUR",
			"JALANDHAR",
			"KAPURTHALA",
			"LUDHIANA",
			"MANSA",
			"MOGA",
			"MUKTSAR",
			"NAWANSHAHR",
			"PATHANKOT",
			"PATIALA",
			"RUPNAGAR",
			"S.A.S NAGAR",
			"SANGRUR",
			"TARN TARAN",
		],
		Rajasthan: [
			"AJMER",
			"ALWAR",
			"BANSWARA",
			"BARAN",
			"BARMER",
			"BHARATPUR",
			"BHILWARA",
			"BIKANER",
			"BUNDI",
			"CHITTORGARH",
			"CHURU",
			"DAUSA",
			"DHOLPUR",
			"DUNGARPUR",
			"GANGANAGAR",
			"HANUMANGARH",
			"JAIPUR",
			"JAISALMER",
			"JALORE",
			"JHALAWAR",
			"JHUNJHUNU",
			"JODHPUR",
			"KARAULI",
			"KOTA",
			"NAGAUR",
			"PALI",
			"PRATAPGARH",
			"RAJSAMAND",
			"SAWAI MADHOPUR",
			"SIKAR",
			"SIROHI",
			"TONK",
			"UDAIPUR",
		],
		Sikkim: [
			"EAST DISTRICT",
			"NORTH DISTRICT",
			"SOUTH DISTRICT",
			"WEST DISTRICT",
		],
		"Tamil Nadu": [
			"ARIYALUR",
			"COIMBATORE",
			"CUDDALORE",
			"DHARMAPURI",
			"DINDIGUL",
			"ERODE",
			"KANCHIPURAM",
			"KANNIYAKUMARI",
			"KARUR",
			"KRISHNAGIRI",
			"MADURAI",
			"NAGAPATTINAM",
			"NAMAKKAL",
			"PERAMBALUR",
			"PUDUKKOTTAI",
			"RAMANATHAPURAM",
			"SALEM",
			"SIVAGANGA",
			"THANJAVUR",
			"THE NILGIRIS",
			"THENI",
			"THIRUVALLUR",
			"THIRUVARUR",
			"TIRUCHIRAPPALLI",
			"TIRUNELVELI",
			"TIRUPPUR",
			"TIRUVANNAMALAI",
			"TUTICORIN",
			"VELLORE",
			"VILLUPURAM",
			"VIRUDHUNAGAR",
		],
		"Telangana ": [
			"ADILABAD",
			"HYDERABAD",
			"KARIMNAGAR",
			"KHAMMAM",
			"MAHBUBNAGAR",
			"MEDAK",
			"NALGONDA",
			"NIZAMABAD",
			"RANGAREDDI",
			"WARANGAL",
		],
		Tripura: [
			"DHALAI",
			"GOMATI",
			"KHOWAI",
			"NORTH TRIPURA",
			"SEPAHIJALA",
			"SOUTH TRIPURA",
			"UNAKOTI",
			"WEST TRIPURA",
		],
		"Uttar Pradesh": [
			"AGRA",
			"ALIGARH",
			"ALLAHABAD",
			"AMBEDKAR NAGAR",
			"AMETHI",
			"AMROHA",
			"AURAIYA",
			"AZAMGARH",
			"BAGHPAT",
			"BAHRAICH",
			"BALLIA",
			"BALRAMPUR",
			"BANDA",
			"BARABANKI",
			"BAREILLY",
			"BASTI",
			"BIJNOR",
			"BUDAUN",
			"BULANDSHAHR",
			"CHANDAULI",
			"CHITRAKOOT",
			"DEORIA",
			"ETAH",
			"ETAWAH",
			"FAIZABAD",
			"FARRUKHABAD",
			"FATEHPUR",
			"FIROZABAD",
			"GAUTAM BUDDHA NAGAR",
			"GHAZIABAD",
			"GHAZIPUR",
			"GONDA",
			"GORAKHPUR",
			"HAMIRPUR",
			"HAPUR",
			"HARDOI",
			"HATHRAS",
			"JALAUN",
			"JAUNPUR",
			"JHANSI",
			"KANNAUJ",
			"KANPUR DEHAT",
			"KANPUR NAGAR",
			"KASGANJ",
			"KAUSHAMBI",
			"KHERI",
			"KUSHI NAGAR",
			"LALITPUR",
			"LUCKNOW",
			"MAHARAJGANJ",
			"MAHOBA",
			"MAINPURI",
			"MATHURA",
			"MAU",
			"MEERUT",
			"MIRZAPUR",
			"MORADABAD",
			"MUZAFFARNAGAR",
			"PILIBHIT",
			"PRATAPGARH",
			"RAE BARELI",
			"RAMPUR",
			"SAHARANPUR",
			"SAMBHAL",
			"SANT KABEER NAGAR",
			"SANT RAVIDAS NAGAR",
			"SHAHJAHANPUR",
			"SHAMLI",
			"SHRAVASTI",
			"SIDDHARTH NAGAR",
			"SITAPUR",
			"SONBHADRA",
			"SULTANPUR",
			"UNNAO",
			"VARANASI",
		],
		Uttarakhand: [
			"ALMORA",
			"BAGESHWAR",
			"CHAMOLI",
			"CHAMPAWAT",
			"DEHRADUN",
			"HARIDWAR",
			"NAINITAL",
			"PAURI GARHWAL",
			"PITHORAGARH",
			"RUDRA PRAYAG",
			"TEHRI GARHWAL",
			"UDAM SINGH NAGAR",
			"UTTAR KASHI",
		],
		"West Bengal": [
			"24 PARAGANAS NORTH",
			"24 PARAGANAS SOUTH",
			"BANKURA",
			"BARDHAMAN",
			"BIRBHUM",
			"COOCHBEHAR",
			"DARJEELING",
			"DINAJPUR DAKSHIN",
			"DINAJPUR UTTAR",
			"HOOGHLY",
			"HOWRAH",
			"JALPAIGURI",
			"MALDAH",
			"MEDINIPUR EAST",
			"MEDINIPUR WEST",
			"MURSHIDABAD",
			"NADIA",
			"PURULIA",
		],
	};

	const seasons = ["Kharif", "Rabi", "Summer", "Winter", "Whole Year"];

	const soil = [];

	const crops = [
		"Arecanut",
		"Other Kharif pulses",
		"Rice",
		"Banana",
		"Cashewnut",
		"Coconut ",
		"Dry ginger",
		"Sugarcane",
		"Sweet potato",
		"Tapioca",
		"Black pepper",
		"Dry chillies",
		"other oilseeds",
		"Turmeric",
		"Maize",
		"Moong(Green Gram)",
		"Urad",
		"Arhar/Tur",
		"Groundnut",
		"Sunflower",
		"Bajra",
		"Castor seed",
		"Cotton(lint)",
		"Horse-gram",
		"Jowar",
		"Korra",
		"Ragi",
		"Tobacco",
		"Gram",
		"Wheat",
		"Masoor",
		"Sesamum",
		"Linseed",
		"Safflower",
		"Onion",
		"other misc. pulses",
		"Samai",
		"Small millets",
		"Coriander",
		"Potato",
		"Other  Rabi pulses",
		"Soyabean",
		"Beans & Mutter(Vegetable)",
		"Bhindi",
		"Brinjal",
		"Citrus Fruit",
		"Cucumber",
		"Grapes",
		"Mango",
		"Orange",
		"other fibres",
		"Other Fresh Fruits",
		"Other Vegetables",
		"Papaya",
		"Pome Fruit",
		"Tomato",
		"Rapeseed &Mustard",
		"Mesta",
		"Cowpea(Lobia)",
		"Lemon",
		"Pome Granet",
		"Sapota",
		"Cabbage",
		"Peas  (vegetable)",
		"Niger seed",
		"Bottle Gourd",
		"Sannhamp",
		"Varagu",
		"Garlic",
		"Ginger",
		"Oilseeds total",
		"Pulses total",
		"Jute",
		"Peas & beans (Pulses)",
		"Blackgram",
		"Paddy",
		"Pineapple",
		"Barley",
		"Khesari",
		"Guar seed",
		"Moth",
		"Other Cereals & Millets",
		"Cond-spcs other",
		"Turnip",
		"Carrot",
		"Redish",
		"Arcanut (Processed)",
		"Atcanut (Raw)",
		"Cashewnut Processed",
		"Cashewnut Raw",
		"Cardamom",
		"Rubber",
		"Bitter Gourd",
		"Drum Stick",
		"Jack Fruit",
		"Snak Guard",
		"Pump Kin",
		"Tea",
		"Coffee",
		"Cauliflower",
		"Other Citrus Fruit",
		"Water Melon",
		"Total foodgrain",
		"Kapas",
		"Colocosia",
		"Lentil",
		"Bean",
		"Jobster",
		"Perilla",
		"Rajmash Kholar",
		"Ricebean (nagadal)",
		"Ash Gourd",
		"Beet Root",
		"Lab-Lab",
		"Ribed Guard",
		"Yam",
		"Apple",
		"Peach",
		"Pear",
		"Plums",
		"Litchi",
		"Ber",
		"Other Dry Fruit",
		"Jute & mesta",
	];

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
