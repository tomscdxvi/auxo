import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import tw from 'twin.macro';
import { FaComments, FaTimes, FaDumbbell } from 'react-icons/fa';

const ChatbotContainer = styled.div`
    ${tw`
        fixed 
        bottom-5 
        right-5 
        z-50
    `}
`;

const ChatButton = styled.button`
    ${tw`
        w-16 
        h-16 
        bg-gray-background
        text-white 
        flex 
        items-center 
        justify-center 
        rounded-full 
        shadow-lg 
        focus:outline-none 
        transition-all 
        duration-300
    `}

    ${
        (props) => (props.isOpen ? tw`bg-red-600` : tw`bg-gray-background`)
    }

    &:hover {
        background-color: #172C66; /* Change this to your desired hover color */
    }
`;

const ChatWindow = styled.div`
    ${tw`
        w-80 
        h-96 
        bg-white 
        shadow-xl 
        rounded-lg 
        p-4 flex 
        flex-col 
        fixed 
        bottom-20 
        right-5 
        transition-all 
        duration-300
    `}
`;

const ChatHeader = styled.div`
    ${tw`
        flex 
        justify-between 
        items-center 
        border-b 
        pb-2
    `}
`;

const ChatContent = styled.div`
    ${tw`
        flex-1 
        overflow-auto 
        p-2 
        text-paragraph
    `}
`;

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleChat = () => {
        setIsOpen((prev) => !prev);
    };

    // Add a greeting message when the chatbot opens
    useEffect(() => {
        if (isOpen) {
            setMessages([
                { role: 'assistant', content: 'Hello! How can I assist you today?' },
            ]);
        }
    }, [isOpen]);

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        // Add user's message to the state
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'user', content: userInput },
        ]);
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/chatbot/build-workout', {
                prompt: userInput,
            });

            // Add Groq's response to the state
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'assistant', content: response.data.response },
            ]);
        } catch (error) {
            console.error('Error sending message:', error);
        }

        setUserInput('');
        setLoading(false);
    };

    return (
        <ChatbotContainer>
            {isOpen && (
                <ChatWindow>
                    <ChatHeader>
                        <h3 className="text-lg font-semibold">AuxoBot</h3>
                        <button onClick={toggleChat} className="text-black">
                            <FaTimes size={20} />
                        </button>
                    </ChatHeader>
                    <ChatContent>
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                                <p>{msg.content}</p>
                            </div>
                        ))}
                        {loading && <p>Loading...</p>}
                    </ChatContent>
                    <div className="mt-2 flex">
                        <input
                            type="text"
                            className="flex-1 p-2 border rounded"
                            placeholder="Type a message..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="ml-2 p-2 bg-headline text-white rounded"
                        >
                            Send
                        </button>
                    </div>
                </ChatWindow>
            )}
            <ChatButton onClick={toggleChat} isOpen={isOpen}>
                <FaDumbbell size={24} />
            </ChatButton>
        </ChatbotContainer>
    );
};

export default Chatbot;
