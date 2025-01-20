import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import tw from 'twin.macro';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons from react-icons

const SidebarWrapper = styled.div`
    transition: width 0.3s ease; /* Smooth transition */
    width: ${(props) => (props.isCollapsed ? '60px' : '250px')}; /* Dynamic width based on isCollapsed state */
    height: 100%;
    position: fixed;
    right: 0;  /* Fixed to the right */
    top: 0;    /* Fixed to the top */
    background-color: #333;
    color: white;
    padding: 20px;
    overflow-y: none;
    z-index: 10;  /* Ensures the sidebar stays on top */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 40px; /* Adjust the padding to give space for the button */
`;

const ToggleButton = styled.button`
    background-color: #444;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin-bottom: 20px;
    width: 40px; /* Set the width of the button */
    height: 40px; /* Set the height of the button */
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%; /* Position the button in the center vertically */
    left: -20px; /* Position the button slightly outside the sidebar */
    transform: translateY(-50%); /* Vertically center it */
    border-radius: 50%;
    transition: all 0.3s ease;

    &:hover {
        background-color: #555;
    }
`;

const SidebarContent = styled.div`
    display: flex;
    flex-direction: column;
    visibility: ${(props) => (props.isCollapsed ? 'hidden' : 'visible')}; /* Hide content when collapsed */
    opacity: ${(props) => (props.isCollapsed ? 0 : 1)}; /* Fade out content when collapsed */
    transition: visibility 0.3s, opacity 0.3s; /* Smooth transition */

    ${tw`
        w-full
        flex
        justify-center
        items-center
    `}
`;

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true); // isCollapsed state controls the sidebar
    const [groqData, setGroqData] = useState(null);

    // Toggle function to collapse/expand the sidebar
    const toggleSidebar = () => {
        setIsCollapsed(prevState => !prevState);
    };

    // Fetch data from Groq API (your API call)
    const fetchGroqData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/groqData');
            setGroqData(response.data);
        } catch (error) {
            console.error('Error fetching Groq data:', error);
        }
    };

    useEffect(() => {
        fetchGroqData();
    }, []);

    return (
        <SidebarWrapper isCollapsed={isCollapsed}>
            {/* Collapse Button */}
            <ToggleButton onClick={toggleSidebar}>
                {isCollapsed ? <FaChevronLeft /> : <FaChevronRight />} {/* Display icons based on collapse state */}
            </ToggleButton>

            {/* Sidebar Content */}
            <SidebarContent isCollapsed={isCollapsed}>
                <h3 className="text-xl font-semibold">Groq AI Data</h3>
                {groqData ? (
                    <pre className="bg-gray-700 text-gray-100 p-4 rounded">{JSON.stringify(groqData, null, 2)}</pre>
                ) : (
                    <p>Loading data...</p>
                )}
            </SidebarContent>
        </SidebarWrapper>
    );
};

export default Sidebar;
