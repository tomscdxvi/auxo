import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import tw from 'twin.macro';
import { FaComments, FaTimes } from 'react-icons/fa';

const ChatbotContainer = styled.div`
    ${tw`fixed bottom-5 right-5 z-50`}
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

    ${(props) => (props.isOpen ? tw`bg-red-500` : tw`bg-paragraph`)}
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
        text-gray-700
    `}
`;

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [groqData, setGroqData] = useState(null);

    const toggleChat = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        const fetchGroqData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/groqData');
                setGroqData(response.data);
            } catch (error) {
                console.error('Error fetching Groq data:', error);
            }
        };
        fetchGroqData();
    }, []);

    return (
        <ChatbotContainer>
            {isOpen && (
                <ChatWindow>
                    <ChatHeader>
                        <h3 className="text-lg text-headline font-semibold">Groq AI Data</h3>
                        <button onClick={toggleChat} className="text-paragraph">
                            <FaTimes size={20} />
                        </button>
                    </ChatHeader>
                    <ChatContent>
                        {groqData ? (
                            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto text-paragraph">
                                {JSON.stringify(groqData, null, 2)}
                            </pre>
                        ) : (
                            <p>Loading data...</p>
                        )}
                    </ChatContent>
                </ChatWindow>
            )}
            <ChatButton onClick={toggleChat} isOpen={isOpen}>
                <FaComments size={24} />
            </ChatButton>
        </ChatbotContainer>
    );
};

export default Chatbot;
