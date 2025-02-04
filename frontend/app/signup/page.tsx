import React from "react";

const SignUp: React.FC = () => {
	return (
		<div className="flex justify-center items-center h-screen bg-[#fff]">
			<section className="w-[1643px]">
				<div className="w-[922px] h-[741px] bg-[#fff] rounded-[23px] mx-auto">
					<div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
						<div className="w-[489px]">
							<h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
								Sign up
							</h2>
							<p className="mt-2 text-base text-gray-600">
								Already have an account?{" "}
								<a
									href="/signin"
									title=""
									className="font-medium text-black transition-all duration-200 hover:underline"
								>
									Sign In
								</a>
							</p>
							<form action="#" method="POST" className="mt-8">
								<div className="space-y-5">
									<div>
										<label
											htmlFor="name"
											className="text-base font-medium text-gray-900"
										>
											Full Name
										</label>
										<div className="mt-2">
											<input
												className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
												type="text"
												placeholder="Full Name"
												id="name"
												name="name"
											/>
										</div>
									</div>
									<div>
										<label
											htmlFor="email"
											className="text-base font-medium text-gray-900"
										>
											Email address
										</label>
										<div className="mt-2">
											<input
												className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
												type="email"
												placeholder="Email"
												id="email"
												name="email"
											/>
										</div>
									</div>
									<div>
										<label
											htmlFor="phone"
											className="text-base font-medium text-gray-900"
										>
											Phone Number
										</label>
										<div className="mt-2">
											<input
												className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
												type="number"
												placeholder="Phone No."
												id="phone"
												name="Phone No."
											/>
										</div>
									</div>
									<div>
										<div className="flex items-center justify-between">
											<label
												htmlFor="password"
												className="text-base font-medium text-gray-900"
											>
												Password
											</label>
										</div>
										<div className="mt-2">
											<input
												className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
												type="password"
												placeholder="Password"
												id="password"
												name="password"
											/>
										</div>
									</div>
									<div>
										<button
											type="button"
											className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
										>
											Create Account{" "}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="ml-2"
											>
												<line x1="5" y1="12" x2="19" y2="12"></line>
												<polyline points="12 5 19 12 12 19"></polyline>
											</svg>
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default SignUp;
