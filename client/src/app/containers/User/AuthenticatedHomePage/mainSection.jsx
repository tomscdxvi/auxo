import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import tw from 'twin.macro';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@mui/styles';
import { Chart as ChartJS } from 'chart.js/auto'
import { Box, FormControl, InputLabel, Menu, MenuItem, Modal, Select, TextField, Typography, Pagination, Stack } from '@mui/material';
// import { slide as Menu } from 'react-burger-menu';

import Chatbot from 'src/app/components/chatbot';
import TrackCard from './Card';
import { FooterDark } from '../../../components/footer';
import { FormInputDark } from '../../../components/form';
import { DarkLogo } from '../../../components/logo';
import { SCREENS } from '../../../components/responsive';
import SignUpIllustration from '../../../../assets/images/auth-illustration.png';
import '../../../styles/font.css';
import '../../../styles/authenticatedhome/main.css';
import { DeleteButton } from '../../../components/delete';
import { Button } from 'src/app/components/button';
import CustomBarChart from 'src/app/components/charts/bar-chart';
import Loading from 'src/app/components/loading';
import { NavItemsLoggedIn } from 'src/app/components/navbar/navitems';

const PageContainer = styled.div`
    min-height: 100vh;
    ${tw`
        flex
        relative
    `}
`;

const MainContainer = styled.div`
    width: 1400px;
    ${tw`
        flex
        flex-col
        p-12
        mx-auto
    `}
`;

// Navbar stays on the left side of the screen, fixed
const NavbarContainer = styled.div`
    ${tw`
        pt-10
        flex
        flex-col
        items-center
        fixed
        left-0
        top-0
        h-full
        bg-white
        z-10
        p-4
    `}
`;

// Sidebar stays on the right side of the screen, fixed
const SidebarContainer = styled.div`
    ${tw`
        fixed
        right-0
        top-0
        h-full
        bg-gray-800
        text-white
        p-6
    `}
`;

const ListContainer = styled.ul`
    ${tw`
        mt-32
        list-none
    `}
`;

const MobileListContainer = styled.ul`
    ${tw`
        mt-6
        list-none
    `}
`;

const LogOutItem = styled.li`
    font-family: 'Montserrat', sans-serif;
    margin-top: 24px;
    ${tw`
        text-lg
        medium:text-xl
        text-paragraph
        font-bold
        mr-1
        medium:mr-12
        cursor-pointer
        transition
        duration-200
        ease-in-out
        hover:bg-button
        rounded-md
        p-2
    `}
`;

const NavItem = styled.li`
    font-family: 'Montserrat', sans-serif;
    margin-top: 24px;
    ${tw`
        text-lg
        medium:text-xl
        text-paragraph
        font-bold
        mr-1
        medium:mr-12
        cursor-pointer
        transition
        duration-200
        ease-in-out
        hover:bg-white
        rounded-md
        p-2
    `}
`;

const MobileSignUpItem = styled.li`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        text-lg
        medium:text-xl
        text-paragraph
        font-medium
        mr-8
        cursor-pointer
        transition
        duration-200
        ease-in-out
        hover:bg-button
        rounded-md
        p-2
    `}
`;

const ToggleItem = styled.li`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        text-lg
        medium:text-xl
        text-paragraph
        font-medium
        mr-1
        medium:mr-12
        cursor-pointer
        transition
        no-underline 
        duration-200
        hover:bg-paragraph
        rounded-md
        ease-in-out
        p-2
    `}
`;

const ToggleList = styled.li`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        text-lg
        medium:text-xl
        text-paragraph
        font-medium
        mr-1
        medium:mr-12
        cursor-pointer
        transition
        no-underline 
        duration-200
        hover:underline
        rounded-md
        ease-in-out
        p-2
    `}
`;

const Title = styled.h1`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        text-headline
        mb-4
        tracking-wider
        font-bold
        xlarge:text-xl 
        xlarge:leading-relaxed
    `}
`;

const ToggleContainer = styled.div`
    ${tw`
        flex
        items-center
    `}
`

const TrackContainer = styled.div`
    z-index: 100;
    width: 800px;
    ${tw`
        gap-6
        grid
        grid-cols-3
        medium:grid-cols-2
    `}
`;

const MobileTrackContainer = styled.div`
    z-index: 100;
    width: 250px;
    ${tw`
        grid
        grid-cols-1
        gap-6
    `}
`;

const ButtonsContainer = styled.div`
    ${tw`
        flex
        flex-wrap
        mt-6
        items-center
        justify-center
    `}
`;

// Styled components using twin.macro
const CardList = styled.div`
    ${tw`
        flex 
        gap-4 
        overflow-x-auto 
        p-4
    `}
`;

const Card = styled.div`
    height: 150px;
    width: 250px;
    ${tw`
        rounded-lg 
        shadow-lg
    `}
    background-color: ${(props) => props.color};
`;

const CardContent = styled.div`
    ${tw`
        h-full
        w-full
        flex 
        flex-col  /* Makes items stack vertically */
        items-center  
        justify-center 
        text-center /* Ensures text is centered */
    `}
`;

const CardHeader = styled.div`
    ${tw`
        text-white 
        text-lg
        font-semibold
    `}
`;

const CardText = styled.div`
    ${tw`
        text-white 
        text-lg
        font-bold
    `}
`

// Set the styles and classes for MUI inputs
const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff"
        },
        "& .MuiOutlinedInput-input": {
            color: "#ffffff"
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "#ffffff"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#ffffff"
        },
        "& .MuiInputLabel-outlined": {
            color: "#ffffff"
        },
        "&:hover .MuiInputLabel-outlined": {
            color: "#ffffff"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#ffffff"
        },
        "& .MuiSvgIcon-root": { 
            color: "#ffffff" 
        },
    },
    select: {
        "& .MuiOutlinedInput-input": {
            color: "#ffffff"
        },  
        "&.MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#ffffff"
            },
            "&:hover fieldset": {
                borderColor: "#ffffff"
            },
            "&.Mui-focused fieldset": {
                borderColor: "#ffffff"
            }
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#ffffff"
        },
        "& .MuiInputLabel-outlined": {
            color: "#ffffff"
        },
        "&:hover .MuiInputLabel-outlined": {
            color: "#ffffff"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#ffffff"
        }
    }
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export function MainSection() {

    // Navigate between pages
    const navigate = useNavigate();

    // Cookies for JWT authorization
    const [ cookies, setCookies, removeCookie ] = useCookies([]);

    // Loading state to check for API call before rendering page.
    const [loading, setLoading] = useState(true);   

    const [loadingProgress, setLoadingProgress] = useState(0);

    const [hasWelcomed, setHasWelcomed] = useState(false); // Track if the welcome toast has been shown

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Data state to store response data from the api
    const [ data, setData ] = useState([]);

    // Handle trackingHistory and to store user's history for easy usability
    const [ trackingHistory, setTrackingHistory ] = useState([])

    const [ filteredTrackingHistory, setFilteredTrackingHistory ] = useState([trackingHistory])

    // Handle chart data
    const [ chartData ] = useState({
        labels: ["2023/09", "2023/10", "2023/11"],
        datasets: [{
            label: "Workouts in 2023",
            data: [15, 23, 10],
            backgroundColor: "#172C66",
        }],
    })

    // Set view type states for handling view change
    const [ viewType, setViewType ] = useState(1)

    // Set sort type state for handling sorting change
    const [ sortType, setSortType ] = useState("SortASC")

    // Set search string to filter/search for objects in array
    const [ search, setSearch ] = useState("")

    // Log out modal
    const [ logOutModalOpen, setLogOutModalOpen ] = useState(false);
    const handleLogOutModal = (e) => {

        e.preventDefault();

        setLogOutModalOpen(true);
    }
    
    // Log out Modal
    const handleLogOutModalClose = (e) => {

        e.preventDefault();

        setLogOutModalOpen(false);
    }

    // Pagination variables
    const [ activePage, setActivePage ] = useState(1);
    const itemsPerPage = 4;
    const pagesVisited = (activePage - 1) * itemsPerPage;
    const numberOfPages = Math.ceil(trackingHistory.length / itemsPerPage);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    // Handles the page change for pagination
    const handlePageChange = (e, value) => {
        setActivePage(value);
    }

    // Get user data async function
    const getUserData = async () => {
        try {
            // Initially set Loading to true to ensure that the page is loading at the moment
            setLoading(true);

            // Start the loading progress
            const progressInterval = setInterval(() => {
                setLoadingProgress(prev => {
                    if (prev < 100) return prev + 2; // Increase by 2% every interval
                    return prev;
                });
            }, 100); // Adjust this interval for the desired speed

            // Get user id from local storage when it is initially stored when the user logs in
            const userId = localStorage.getItem('@storage_user');

            // Axios get from api route which will find a user by id and return the user's data
            await axios.get(`http://localhost:5000/user/${userId}`).then((res) => {
                // console.log(res.data.history[0].title);

                // Set the data state to hold the response data which is the user's data
                setData(res.data);

                // Set an alternate state array with the returned user's history for easy and accessible workflow (i.e To sort and filter)
                setTrackingHistory(res.data || []);

                
                // Once data is received, stop the progress update
                clearInterval(progressInterval);
                setLoadingProgress(100);  // Ensure progress is set to 100% when done
                // Set a slight delay before setting loading to false, just to allow the animation to finish
                setTimeout(() => {
                    setLoading(false);  // Data is loaded, and now set loading to false
                }, 1250);  // Optional delay before transitioning (adjust as needed)
                
            });
        } catch(error) {
            console.log(error);
            setLoading(false);
        }
    }

    console.log(data);

    // Verify user when before page is rendered
    useEffect(() => {
        const verifyUser = async () => {
            if(!cookies.jwt) {
                navigate("/");
            } else {
                try { 
                    await axios.post(
                        "http://localhost:5000/home",
                        {},
                        { withCredentials: true }
                    );
    
                    await getUserData();
                } catch(error) {
                    console.error("Error verifying user", error);
                }
            }
        };
        verifyUser();
    }, [cookies, navigate, removeCookie]);

    // Check for Welcome Back timer (Set to 24 hours in milliseconds)
    useEffect(() => {
        const hasBeenWelcomed = localStorage.getItem("lastWelcomeTime");
        const now = Date.now();
    
        // Check if 24 hours (86400000 milliseconds) have passed
        if (!hasBeenWelcomed || now - parseInt(hasBeenWelcomed, 10) >= 86400000) {
            setHasWelcomed(false);
        } else {
            setHasWelcomed(true);
        }
    }, []);
    
    useEffect(() => {
        if (data.username && !hasWelcomed) {
            toast("⭐ Welcome back, " + data.username, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
    
            setHasWelcomed(true);
    
            // Save the current timestamp to localStorage
            localStorage.setItem("lastWelcomeTime", Date.now().toString());
        }
    }, [data, hasWelcomed]);
        
    // Handle logout function 
    const handleLogOut = () => {
        removeCookie("jwt");
        localStorage.removeItem('@storage_user');
        
        navigate("/");
    };

    // Card Data
    const cardData = [
        { id: 1, color: '#a29bfe', header: 'Level', text: 'Beginner' },
        { id: 2, color: '#0984e3', header: 'Upcoming', text: 'Legs' },
        { id: 3, color: '#ff7675', header: 'Favorite Exercise', text: 'Bench Press' },
        { id: 4, color: '#e17055', header: 'Workouts in April', text: '3' },
    ];

    // Navigation items
    const NavItems = () => {
        return (
            <ListContainer>
                <Link to="/home" className='auth-link'>
                    <NavItem>
                        Home
                    </NavItem>
                </Link>

                <Link to="/track" className='auth-link'>
                    <NavItem>
                        Track
                    </NavItem>
                </Link>

                <Link to="/plan" className='auth-link'>
                    <NavItem>
                        History
                    </NavItem>
                </Link>
    
                <Link to="/calculate" className='auth-link'>
                    <NavItem>
                        Calculate
                    </NavItem>
                </Link>
    
                <LogOutItem onClick={handleLogOutModal}>
                    Log Out
                </LogOutItem>

                <Modal
                    open={logOutModalOpen}
                    onClose={handleLogOutModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Log Out
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Do you wish to log out of this account?
                        </Typography>
                        <div className="flex mt-12">
                            <Button theme="outline-white" text="Back" onClick={handleLogOutModalClose} className="mr-9" /> 
                            <Button theme="filled" text="Confirm" className="mr-9" onClick={handleLogOut} /> 
                        </div>
                    </Box>
                </Modal>
    
                {/* <NavItem style={{ color: 'white' }}>
                    <Link to="/track">Track</Link>
                </NavItem> */}
            </ListContainer>
        )
    }

    const MobileNavItems = () => {
        return (
            <MobileListContainer>
                <Link to="/home" className='auth-link'>
                    <MobileSignUpItem style={{ color: 'white', borderBottom: '2px solid white' }} className='bg-button'>
                        Home
                    </MobileSignUpItem>
                </Link>

                <Link to="/track" className='auth-link'>
                    <MobileSignUpItem style={{ color: 'bg-button', borderBottom: '2px solid white', marginTop: '24px' }}>
                        Track Workout
                    </MobileSignUpItem>
                </Link>

                <Link to="/plan" className='auth-link'>
                    <MobileSignUpItem style={{ color: 'bg-button', borderBottom: '2px solid white', marginTop: '24px' }}>
                        View Plans
                    </MobileSignUpItem>
                </Link>
    
                <Link to="/calculate" className='auth-link'>
                    <MobileSignUpItem style={{ color: 'bg-button', borderBottom: '2px solid white', marginTop: '24px' }}>
                        Calculate
                    </MobileSignUpItem>
                </Link>
    
                <MobileSignUpItem style={{ color: 'bg-button', borderBottom: '2px solid white', marginTop: '24px' }} onClick={handleLogOutModal}>
                    Log Out
                </MobileSignUpItem>

                <Modal
                    open={logOutModalOpen}
                    onClose={handleLogOutModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Log Out
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Do you wish to log out of this account?
                        </Typography>
                        <div className="flex mt-12">
                            <Button theme="outline-white" text="Back" onClick={handleLogOutModalClose} className="mr-9" /> 
                            <Button theme="filled" text="Confirm" className="mr-9" onClick={handleLogOut} /> 
                        </div>
                    </Box>
                </Modal>
    
                {/* <NavItem style={{ color: 'white' }}>
                    <Link to="/track">Track</Link>
                </NavItem> */}
            </MobileListContainer>
        )
    }
    
    const handleDelete = async (workoutId) => {
        try {
            // Send the DELETE request using axios
            const { data } = await axios.delete(`http://localhost:5000/api/delete-workout/${workoutId}`, {
                withCredentials: true, // Ensures cookies (JWT) are sent
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            // Handle the response data
            if (data.error) {
                throw new Error(data.error || "Failed to delete workout");
            }
    
            // Remove the workout from the state to update the UI
            setTrackingHistory((prevHistory) => prevHistory.filter((track) => track._id !== workoutId));
    
            console.log("Workout deleted:", data.message);
        } catch (error) {
            console.error("Error deleting workout:", error.message);
        }
    };
    
    // Handles chart view type 
    const handleChartView = (e) => {
        e.preventDefault();

        setViewType(2);
    }

    // Handles the list view type
    const handleListView = (e) => {
        e.preventDefault();

        setViewType(1);
    }

    // Handles the extra view type
    const handleExtraView = (e) => {
        e.preventDefault();

        setViewType(3);
    }

    // Sorts the tracking history (A-Z)
    const handleAZSort = (e) => {
        e.preventDefault()

        const sortedArray = [...trackingHistory].sort((a, b) => (a.title > b.title) ? 1 : -1)

        setTrackingHistory(sortedArray)
    }

    // Sorts the tracking history (Z-A)
    const handleZASort = (e) => {
        e.preventDefault()

        const sortedArray = [...trackingHistory].sort((a, b) => (a.title < b.title) ? 1 : -1)

        setTrackingHistory(sortedArray)
    }

    // Styling classes 
    const classes = useStyles();
    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});
 
    if(loading) {
        return <Loading loadingProgress={loadingProgress} />
    } else if(!loading && isMobile) {
        return (
            <>
                <NavbarContainer>  
                    <Title         
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        className='bm-burger-button'
                    >
                        =
                    </Title>

                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                    >
                        <MobileNavItems />
                    </Menu>

                    {/* <Menu>
                        <DarkLogo />
                        <MobileNavItems />
                    </Menu> */}
                </NavbarContainer>
                <PageContainer>
                    <ToastContainer position="top-right"
                        autoClose={1500} 
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />

                    <MainContainer>
                        <Title>Hi, {data.data.username}</Title>
                        <Title style={{ textDecoration: "underline", marginTop: '3rem' }}>Tracking History</Title>

                        <MobileTrackContainer>
                            {data.data.history?.map((track) => {
                                if(track === null) {
                                    return (
                                        <Title style={{ fontSize: '16px' }}>Your tracking history is empty, enter your first workout to see your history!</Title>
                                    )
                                } else {
                                    return (
                                        <>
                                            <TrackCard key={track._id} track={track} handleDelete={handleDelete} />
                                        </>
                                    )
                                }
                            })} 
                        </MobileTrackContainer>

                    </MainContainer>
                </PageContainer>
            </>
        )
    } else {
        return (
            <>
                <PageContainer>
                    <ToastContainer position="top-right"
                        autoClose={1500} 
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    /> 
                    {/*
                    <ToggleContainer>
                        <ul>
                            <li>
                                <ToggleItem style={{ color: 'white', marginTop: '24px' }} onClick={handleListView}>
                                    List
                                </ToggleItem>
                            </li>
                            <li>                            
                                <ToggleItem style={{ color: 'white', marginTop: '24px' }} onClick={handleChartView}>
                                    Chart
                                </ToggleItem>
                            </li>
                            {/* <li>                            
                                <ToggleItem style={{ color: 'white', marginTop: '24px' }} onClick={handleExtraView}>
                                    Extra
                                </ToggleItem>
                            </li> 
                        </ul>
                    </ToggleContainer> 
                    */}
                    <MainContainer>
                        <CardList>
                            {cardData.map((card) => (
                                <Card key={card.id} color={card.color}>
                                    <CardContent>
                                        <CardHeader>
                                            {card.header}
                                        </CardHeader>
                                        <CardText>
                                            {card.text}
                                        </CardText>
                                    </CardContent>
                                </Card>
                            ))}
                        </CardList>
                        <Title style={{ marginTop: '3rem' }}>Past Workouts</Title>
                            {viewType === 1 && 
                                <>  
                                    {/* 
                                    <div>
                                        <ul className='flex'>
                                            <li>
                                                <Box sx={{ minWidth: 60, marginRight: 12 }}>
                                                    <Title>Sort</Title>
                                                    <FormControl style={{ minWidth: 180 }}>
                                                        <TextField
                                                            label="Sort Options"
                                                            name="sort-options"
                                                            className={classes.select}
                                                            fullWidth
                                                            select
                                                            onChange={(e) => {
                                                                setSortType(e.target.value)
                                                                setActivePage(1)
                                                            }}
                                                        >
                                                            <MenuItem value={"SortASC"} onClick={handleAZSort}>Sort (ASC)</MenuItem>
                                                            <MenuItem value={"SortDESC"} onClick={handleZASort}>Sort (DESC)</MenuItem>
                                                        </TextField>
                                                    </FormControl>
                                                </Box>
                                            </li>
                                            <li>    
                                                <div>
                                                    <Title>Search</Title>                        
                                                    <TextField
                                                        placeholder="Search"
                                                        label="Search"
                                                        fullWidth
                                                        required
                                                        onChange={(e) => {
                                                            setSearch(e.target.value)
                                                        }}
                                                        className={classes.root}
                                                    />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    */}
                                    <div className='mb-6'>                       
                                        <TextField
                                            placeholder="Search..."
                                            fullWidth
                                            onChange={(e) => {
                                                setSearch(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <TrackContainer>
                                        {/* slice is used for pagination, filter is used to search, and map is used to list out the array of objects. */}
                                        {trackingHistory && trackingHistory.length > 0 ? (
                                            trackingHistory
                                                .filter((track) => track.title?.toLowerCase().includes(search.toLowerCase() || ""))
                                                .slice(pagesVisited, pagesVisited + itemsPerPage)
                                                .map((track) => (
                                                    <div key={track._id}>
                                                        <TrackCard track={track} handleDelete={handleDelete} />
                                                    </div>
                                                ))
                                            ) : (
                                                <Title style={{ fontSize: '16px' }}>
                                                    Your tracking history is empty, enter your first workout to see your history!
                                                </Title>
                                            )
                                        }
                                    </TrackContainer>
                                    <Stack spacing={2} className='flex justify-center items-center'>
                                        <Pagination 
                                            count={numberOfPages} 
                                            page={activePage} 
                                            onChange={handlePageChange}
                                            variant="outlined"
                                            shape="rounded" 
                                            color="primary"
                                        />
                                    </Stack>
                                </>
                            }
                            {/*
                            {viewType === 2 && 
                                <div style={{ width: "1250px", backgroundColor: "white", borderRadius: "8px", padding: "24px" }}>
                                    <CustomBarChart chartData={chartData} />
                                </div>
                            }
                            */}
                            {/* {viewType === 3 && <h1 className='text-white'>Extra</h1>} */}
                    </MainContainer>
                    <Chatbot />
                </PageContainer>
            </>
        )               
    }
}