"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2, MinimizeIcon, MaximizeIcon } from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

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
	const [isMinimized, setIsMinimized] = useState(true);

	// Create a ref for the messages container
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Function to scroll to the bottom
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	// Automatically scroll when messages change
	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const chat_resp = async () => {
		try {
			const response = await axios.post(
				"https://cropmate-backend.onrender.com/support",
				{
					prompt: newMessage, // Current user message
					response: messages
						.filter((m) => m.sender === "agent" || m.sender === "user")
						.map((m) => ({
							prompt: m.sender === "user" ? m.content : null, // Assign content if sender is 'user'
							answer: m.sender === "agent" ? m.content : null, // Assign content if sender is 'agent'
						}))
						.slice(-5) // Limit to last 5 messages
						.filter((m) => m.prompt || m.answer), // Remove empty entries
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			// Add agent's response to messages
			if (response.data) {
				const agentMessage = {
					id: messages.length + 2,
					content: response.data.answer, // Use 'answer' from backend
					sender: "agent",
					timestamp: new Date(),
				};
				setMessages((prev) => [...prev, agentMessage]);
			}
		} catch (error) {
			console.error("Error sending message:", error);

			// Optional: Add an error message to the chat
			const errorMessage = {
				id: messages.length + 2,
				content: "Sorry, there was an error processing your message.",
				sender: "agent",
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
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

		// Send message and get response
		setIsLoading(true);
		await chat_resp();
	};

	return (
		<div className="fixed bottom-4 right-4 w-[100%-2rem] sm:w-96 z-50">
			<div className="bg-white rounded-lg shadow-lg overflow-hidden">
				{/* Header */}
				<div className="bg-[#2b3f51] p-4 flex justify-between items-center">
					<h3 className="text-white font-semibold pr-5">Support Chat</h3>
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
						<div className="max-h-[calc(100vh-14rem)] p-4 overflow-y-auto bg-gray-50 relative transition-all duration-300 ">
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
													? "bg-[#2b3f51] text-white"
													: "bg-gray-200 text-gray-800"
											}`}
										>
											{message.sender === "agent" ? (
												<ReactMarkdown>{message.content}</ReactMarkdown>
											) : (
												<p>{message.content}</p>
											)}
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
								{/* Ref to scroll to bottom */}
								<div ref={messagesEndRef} />
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
									className="bg-[#2b3f51] text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
