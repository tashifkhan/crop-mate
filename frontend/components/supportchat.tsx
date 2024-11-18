"use client";
import React, { useState } from "react";
import { Send, Loader2, MinimizeIcon, MaximizeIcon } from "lucide-react";

const SupportChat = () => {
	const [messages, setMessages] = useState([
		{
			id: 1,
			content: "Hello! How can I help you today?",
			sender: "agent",
			timestamp: new Date(),
		},
	]);
	const [newMessage, setNewMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isMinimized, setIsMinimized] = useState(false);

	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (!newMessage.trim()) return;

		// Add user message
		const userMessage = {
			id: messages.length + 1,
			content: newMessage,
			sender: "user",
			timestamp: new Date(),
		};
		setMessages((prev) => [...prev, userMessage]);
		setNewMessage("");

		// Simulate agent response
		setIsLoading(true);
		setTimeout(() => {
			const agentMessage = {
				id: messages.length + 2,
				content: "Thanks for your message. An agent will respond shortly.",
				sender: "agent",
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, agentMessage]);
			setIsLoading(false);
		}, 1000);
	};

	return (
		<div className="fixed bottom-4 right-4 w-96 z-50">
			<div className="bg-white rounded-lg shadow-lg overflow-hidden">
				{/* Header */}
				<div className="bg-blue-600 p-4 flex justify-between items-center">
					<h3 className="text-white font-semibold">Support Chat</h3>
					<button
						onClick={() => setIsMinimized(!isMinimized)}
						className="text-white hover:text-blue-100"
					>
						{isMinimized ? (
							<MaximizeIcon size={20} />
						) : (
							<MinimizeIcon size={20} />
						)}
					</button>
				</div>

				{/* Chat area */}
				{!isMinimized && (
					<>
						<div className="h-96 p-4 overflow-y-auto bg-gray-50">
							<div className="space-y-4">
								{messages.map((message) => (
									<div
										key={message.id}
										className={`flex ${
											message.sender === "user"
												? "justify-end"
												: "justify-start"
										}`}
									>
										<div
											className={`max-w-[80%] rounded-lg p-3 ${
												message.sender === "user"
													? "bg-blue-600 text-white"
													: "bg-gray-200 text-gray-800"
											}`}
										>
											<p>{message.content}</p>
											<span className="text-xs opacity-75 mt-1 block">
												{message.timestamp.toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit",
												})}
											</span>
										</div>
									</div>
								))}
								{isLoading && (
									<div className="flex justify-start">
										<div className="bg-gray-200 rounded-lg p-3">
											<Loader2 className="w-5 h-5 animate-spin" />
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Input area */}
						<form onSubmit={handleSendMessage} className="p-4 border-t">
							<div className="flex space-x-2">
								<input
									type="text"
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									placeholder="Type your message..."
									className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
								<button
									type="submit"
									disabled={isLoading}
									className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<Send size={20} />
								</button>
							</div>
						</form>
					</>
				)}
			</div>
		</div>
	);
};

export default SupportChat;
