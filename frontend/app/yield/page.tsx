import Button from "@/components/Button";
import React from "react";

type Props = {};

export default function ({}: Props) {
	return (
		<>
			<div className="flex align-center justify-center pt-[7%]">
				<div className="w-[923px] h-[718px] bg-[#bee7db] rounded-[23px]">
					<div className="text-center text-[#092635] text-[64px] font-extrabold font-['Podkova'] leading-normal pt-[1.2rem]">
						Yield Estimation
					</div>
					<form>
						<div className="w-[689px] h-[49px] bg-[#dbeee8] rounded-[10px] border border-[#466459]/40 mx-auto p-2">
							<input
								type="text"
								className="w-[100%] bg-[#dbeee8] rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[#486258]/60 text-[22px] font-semibold font-['Inter'] leading-[33px]"
								placeholder="Land Area"
							/>
						</div>
						<div className="w-[689px] h-[49px] bg-[#dbeee8] rounded-[10px] border border-[#466459]/40 mx-auto p-2 mt-5">
							<input
								type="location"
								className="w-[100%] bg-[#dbeee8] rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[#486258]/60 text-[22px] font-semibold font-['Inter'] leading-[33px]"
								placeholder="Land Area"
							/>
						</div>
						<div className="w-[689px] h-[49px] bg-[#dbeee8] rounded-[10px] border border-[#466459]/40 mx-auto p-2 mt-5">
							<input
								type="location"
								className="w-[100%] bg-[#dbeee8] rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[#486258]/60 text-[22px] font-semibold font-['Inter'] leading-[33px]"
								placeholder="Land Area"
							/>
						</div>
						<div className="w-[689px] h-[49px] bg-[#dbeee8] rounded-[10px] border border-[#466459]/40 mx-auto p-2 mt-5">
							<input
								type="location"
								className="w-[100%] bg-[#dbeee8] rounded-[10px] border-none text-[#466459] pl-[1.2rem] text-[#486258]/60 text-[22px] font-semibold font-['Inter'] leading-[33px]"
								placeholder="Land Area"
							/>
						</div>
						<button> Submit </button>
					</form>
				</div>
			</div>
		</>
	);
}
