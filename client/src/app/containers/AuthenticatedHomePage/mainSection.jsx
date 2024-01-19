import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twin.macro';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Chart as ChartJS } from 'chart.js/auto'
// import { slide as Menu } from 'react-burger-menu';

import TrackCard from './Card';
import { FooterDark } from '../../components/footer';
import { FormInputDark } from '../../components/form';
import { DarkLogo } from '../../components/logo';
import { SCREENS } from '../../components/responsive';
import SignUpIllustration from '../../../assets/images/auth-illustration.png';
import '../../styles/font.css';
import '../../styles/authenticatedhome/main.css';
import { DeleteButton } from '../../components/delete';
import { Button } from 'src/app/components/button';
import { Box, FormControl, InputLabel, Menu, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import CustomBarChart from 'src/app/components/charts/bar-chart';

const PageContainer = styled.div`
    min-height: 100vh;
    ${tw`
        flex
    `}
`;

const MainContainer = styled.div`
    width: 1605px;
    ${tw`
        flex
        flex-col
        justify-center
        items-center
    `}
`;

const NavbarContainer = styled.div`
    ${tw`
        pt-10
        max-w-screen-2xlarge
        flex
        flex-col
        items-center
        ml-0
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

const SignInItem = styled.li`
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
        duration-200
        ease-in-out
        hover:bg-button
        rounded-md
        p-2
    `}
`;

const SignUpItem = styled.li`
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
        duration-200
        ease-in-out
        hover:bg-button
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
        text-white
        mb-4
        tracking-wider
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

const HorizontalLine = styled.hr`
    width: 23%;
    position: absolute;
    top: 57%;
    left: 0;
    z-index: 1;
    visibility: hidden;
    ${tw`
        text-white
        xlarge:visible
    `}
`

const ImageContainer = styled.div`
    width: auto;
    height: 20em;
    left: 12em;
    top: 16em;
    position: absolute;
    visibility: hidden;
    z-index: 2;
    img {
        width: auto;
        height: 100%;
        max-width: fit-content;
    }

    @media (min-width: ${SCREENS.lg}) {
        height: 16 em;
        right: -4em;
        top: -6em;
    }

    @media (min-width: ${SCREENS.xl}) {
        height: 26em;
        right: 2em;
        top: -6em;
    }

    ${tw`
        medium:visible
    `}
`;

const FooterContainer = styled.div`
    width: 78%;
    position: absolute;
    top: 97.5%;
    text-align: center;
    ${tw`
        text-sm
        text-paragraph
    `}
`

const useStyles = makeStyles(() => ({
    ul: {
        "& .MuiPaginationItem-root": {
            color: "#fff"
        }
    },
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff"
        },
        "& .MuiOutlinedInput-input": {
          color: "#fff"
        },
        "&:hover .MuiOutlinedInput-input": {
          color: "#fff"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
          color: "#fff"
        },
        "& .MuiInputLabel-outlined": {
          color: "#fff"
        },
        "&:hover .MuiInputLabel-outlined": {
          color: "#fff"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
          color: "#fff"
        }
    },
    select: {
        "& .MuiOutlinedInput-input": {
            color: "#fff"
        },  
        "&.MuiOutlinedInput-root": {
            "& fieldset": {
            borderColor: "#fff"
            },
            "&:hover fieldset": {
            borderColor: "#fff"
            },
            "&.Mui-focused fieldset": {
            borderColor: "#fff"
            }
        }
    }
}));

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

            // Get user id from local storage when it is initially stored when the user logs in
            const userId = localStorage.getItem('@storage_user');

            // Axios get from api route which will find a user by id and return the user's data
            await axios.get(`http://localhost:5000/user/${userId}`).then((res) => {
                // console.log(res.data.history[0].title);

                // Set the data state to hold the response data which is the user's data
                setData(res);

                // Set an alternate state array with the returned user's history for easy and accessible workflow (i.e To sort and filter)
                setTrackingHistory(res.data?.history)

                
                // Now set loading to false to render the page which the data from the api
                setLoading(false);


                /* 
                toast("⭐ Welcome back, " + res.data.username, {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                }); */
            });
        } catch(error) {
            console.log(error);
        }
    }

    console.log(trackingHistory)

    // Verify user when before page is rendered
    useEffect(() => {
        const verifyUser = async () => {
            if(!cookies.jwt) {
                navigate("/login");
            } else {
                const { data } = await axios.post(
                    "http://localhost:5000/home",
                    {},
                    { withCredentials: true }
                );
                if(!data.status) {
                    removeCookie("jwt");
                    navigate("/login");
                } else {
                    /* toast("⭐ Welcome back, ", {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored"
                    }); */
                }
            }
        };
        verifyUser();
    }, [cookies, navigate, removeCookie]);

    // Get user data before page is rendered
    useEffect(() => {
        try {
            getUserData().then(() => {
                // console.log(`The user's id is: ${userId}`);
                //console.log(data); 
            })
        } catch(error) {
            console.log(error);
        } 
    }, []);
        
    // Handle logout function 
    const handleLogOut = () => {
        removeCookie("jwt");
        localStorage.removeItem('@storage_user');
        
        navigate("/");
    };

    // Navigation items
    const NavItems = () => {
        return (
            <ListContainer>
                <Link to="/home" className='auth-link'>
                    <SignUpItem style={{ color: 'white', borderBottom: '2px solid white' }} className='bg-button'>
                        Home
                    </SignUpItem>
                </Link>

                <Link to="/track" className='auth-link'>
                    <SignUpItem style={{ color: 'white', borderBottom: '2px solid white', marginTop: '24px' }}>
                        Track Workout
                    </SignUpItem>
                </Link>

                <Link to="/plan" className='auth-link'>
                    <SignUpItem style={{ color: 'white', borderBottom: '2px solid white', marginTop: '24px' }}>
                        View Plans
                    </SignUpItem>
                </Link>
    
                <Link to="/calculate" className='auth-link'>
                    <SignUpItem style={{ color: 'white', borderBottom: '2px solid white', marginTop: '24px' }}>
                        Calculate
                    </SignUpItem>
                </Link>
    
                <SignInItem style={{ color: 'white', borderBottom: '2px solid white', marginTop: '24px' }} onClick={handleLogOutModal}>
                    Log Out
                </SignInItem>

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
    
                {/* <SignUpItem style={{ color: 'white' }}>
                    <Link to="/track">Track</Link>
                </SignUpItem> */}
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
    
                {/* <SignUpItem style={{ color: 'white' }}>
                    <Link to="/track">Track</Link>
                </SignUpItem> */}
            </MobileListContainer>
        )
    }
    
    // Handle delete function
    const handleDelete = (e) => {

        e.preventDefault();

        console.log(data.data);

        /* 
        var array = [...data.data.history];

        array.splice(-1);

        setData(array);

        console.log(data); */
    }

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
        return (
            <>
                <h1>Loading</h1>
            </>
        )
    } else if(isMobile) {
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
                    <HorizontalLine /> 
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
                    <NavbarContainer>
                        <DarkLogo />
                        <NavItems />
                    </NavbarContainer>
                    {/* <ImageContainer>
                        <img src={SignUpIllustration} alt="" />
                    </ImageContainer> 
                    <HorizontalLine /> */}
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
                            </li> */}
                        </ul>
                    </ToggleContainer>
                    <MainContainer>
                        <Title>Hi, {data.data.username}</Title>
                        <Title style={{ textDecoration: "underline", marginTop: '3rem' }}>Tracking History</Title>
                            {viewType === 1 && 
                                <>
                                    <div>
                                        <ul className='flex'>
                                            <li>
                                                <Box sx={{ minWidth: 60, marginRight: 12 }}>
                                                    <Title>Sort</Title>
                                                    <FormControl style={{ minWidth: 180 }}>
                                                        <InputLabel id="demo-simple-select-label" style={{ color: "#fff" }}>Sort Options</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            label="Sort Options"
                                                            defaultValue=""
                                                            className={classes.select}
                                                            onChange={(e) => {
                                                                setSortType(e.target.value)
                                                                setActivePage(1)
                                                            }}
                                                        >
                                                            <MenuItem value={"SortASC"} onClick={handleAZSort}>Sort (ASC)</MenuItem>
                                                            <MenuItem value={"SortDESC"} onClick={handleZASort}>Sort (DESC)</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </li>
                                            <li>    
                                                <Box sx={{ minWidth: 60 }}>
                                                    <Title>Search</Title>                        
                                                    <TextField
                                                        placeholder="Search"
                                                        label="Search"
                                                        onChange={(e) => {
                                                            setSearch(e.target.value)
                                                        }}
                                                        className={classes.root}
                                                    />
                                                </Box>
                                            </li>
                                        </ul>
                                    </div>
                                    <TrackContainer>
                                        {/* slice is used for pagination, filter is used to search, and map is used to list out the array of objects. */}
                                        {trackingHistory
                                            .filter((track) => {
                                                return search?.toLowerCase() === "" ? track : track.title?.toLowerCase().includes(search)})
                                            .slice(pagesVisited, pagesVisited + itemsPerPage)
                                            .map((track) => {
                                                if(track === null) {
                                                    return (
                                                        <Title style={{ fontSize: '16px' }}>Your tracking history is empty, enter your first workout to see your history!</Title>
                                                    )
                                                } else {
                                                    return (
                                                        <div>
                                                            <TrackCard key={track._id} track={track} handleDelete={handleDelete} />
                                                        </div>
                                                    )
                                                }
                                            })
                                        } 
                                    </TrackContainer>
                                    <Stack spacing={2}>
                                        <Pagination 
                                            classes={{ ul: classes.ul }}
                                            count={numberOfPages} 
                                            shape="rounded" 
                                            page={activePage} 
                                            onChange={handlePageChange}
                                        />
                                    </Stack>
                                </>
                            }
                            {viewType === 2 && 
                                <div style={{ width: "1250px", backgroundColor: "white", borderRadius: "8px", padding: "24px" }}>
                                    <CustomBarChart chartData={chartData} />
                                </div>
                            }
                            {/* {viewType === 3 && <h1 className='text-white'>Extra</h1>} */}
                    </MainContainer>
                </PageContainer>
            </>
        )               
    }
}