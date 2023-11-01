import React, { useEffect, useState, useRef } from 'react';
import '../../../assets/styles/private_styles/Dashboard.css';
import BarChartUi from '../../components/barchart/BarChart';
import Cards from '../../components/cards/Cards';
import CircularBar from '../../components/circularbar/CircularBar';
import HeatMap from '../../components/heatmap/HeatMap';
import useFitnessStore from '../../../features/store/FitnessStore';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';




export default function Dashboard() {
    const navigate = useNavigate();
    const initialFetch = useRef(false);
    const setAccessToken = useFitnessStore((state) => state.setAccessToken);
    const hasAccessToken = useFitnessStore((state) => state.hasAccessToken);
    const [authCode, setAuthCode] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [selectedDateData, setSelectedDateData] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [detailsData, setDetailsData] = useState(null);

    const [totalSteps, setTotalSteps] = useState(0);
    const [dailySteps, setDailySteps] = useState([]);
    const [weekOffset, setWeekOffset] = useState(0);
    const [totalDistance, setTotalDistance] = useState(0);
    const [dailyDistance, setDailyDistance] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);
    const [dailyCalories, setDailyCalories] = useState([]);
    const [monthlySteps, setMonthlySteps] = useState([]);

    const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_HTTPS_SERVER : import.meta.env.VITE_DEVELOPMENT_SERVER;

    const handleAuth = async () => {
        const response = await fetch(`${baseUrl}/api/auth/getAuthUrl`, {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();
        const authUrl = data.authUrl;
        window.location.href = authUrl;
    };

    const fetchAccessToken = async (authCode) => {
        try {
            const response = await fetch(`${baseUrl}/api/auth/getAccessToken?q=${encodeURIComponent(authCode)}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            if (response.ok) {
                return true;
            }
        } catch (error) {
            console.error("Error fetching access token:", error);
            return false;
        }
    };
    
    const initializeAuth = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            return await fetchAccessToken(code);
        }
        return false;
    };

      // Handler for when a date in the HeatMap is clicked
    const handleDateClick = (dayIndex) => {
        // Create a new Date object representing the clicked day
        const clickedDate = new Date(new Date().getFullYear(), new Date().getMonth(), dayIndex + 1); // +1 because dayIndex would be 0-indexed
        const dateStr = clickedDate.toISOString().split('T')[0]; // Format the date as a string
        
        // Retrieve the steps from the monthlyData using the dayIndex
        const steps = monthlySteps[dayIndex] || 0; // Fallback to 0 if no data

        // Set the data for the modal
        setDetailsData({ date: dateStr, steps: steps });

        // Show the modal
        setShowDetailsModal(true);
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            if (!initialFetch.current) {
                initialFetch.current = true;
                const auth = await initializeAuth();
                if (auth) {
                    initialFetch.current = false;
                    setAccessToken(true);
                    setIsAuthorized(true);
                    navigate('/dashboard')
                } else {
                    initialFetch.current = false;
                    setIsAuthorized(false);
                }
            }
        };
        if (!hasAccessToken) {
            fetchInitialData();
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (hasAccessToken) {
                // Fetch step data
                const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_HTTPS_SERVER : import.meta.env.VITE_DEVELOPMENT_SERVER;
                const stepDataResponse = await fetch(`${baseUrl}/api/fitness/getStepData`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        weekOffset: weekOffset,
                        timeRange: 'weekly',
                    }),
                });
                if (stepDataResponse.ok) {
                    const stepData = await stepDataResponse.json();
                    setDailySteps(stepData.dailySteps);
                    setTotalSteps(stepData.totalSteps);
                }
                const monthlyDataResponse = await fetch(`${baseUrl}/api/fitness/getStepData`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        weekOffset: 0, 
                        timeRange: 'monthly',
                    }),
                });
                if (monthlyDataResponse.ok) {
                    const monthlyData = await monthlyDataResponse.json();
                    setMonthlySteps(monthlyData.dailySteps);
                }
                
                // Fetch distance data
                const distanceDataResponse = await fetch(`${baseUrl}/api/fitness/getDistanceData`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        weekOffset: weekOffset, 
                    }),
                });
                if (distanceDataResponse.ok) {
                    const distanceData = await distanceDataResponse.json();
                    setDailyDistance(distanceData.dailyDistance);
                    setTotalDistance(distanceData.totalDistance);
                }
                
                // Fetch calorie data
                const calorieDataResponse = await fetch(`${baseUrl}/api/fitness/getCaloriesData`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        weekOffset: weekOffset, 
                    }),
                });
                if (calorieDataResponse.ok) {
                    const calorieData = await calorieDataResponse.json();
                    setDailyCalories(calorieData.dailyCalories);
                    setTotalCalories(calorieData.totalCalories);
                }
            }
        }
        fetchData();
    }
    , [hasAccessToken, weekOffset]);

    const getCurrentWeekRange = (weekOffset) => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) - (7 * weekOffset));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
    
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
        const startMonth = monthNames[startOfWeek.getMonth()];
        const endMonth = monthNames[endOfWeek.getMonth()];
    
        return `${startMonth} ${startOfWeek.getDate()} - ${endMonth} ${endOfWeek.getDate()}`;
    };

    return (
        <div className='container dashboard-container bg-light col-lg-9'>
            <div className="container w-100 h-100">
                <div className='container'>
                    {!isAuthorized ? (
                        <div className='row justify-content-center align-items-center' style={{ height: '100vh' }}> {/* Full height container */}
                            <div className='col-md-6 col-lg-4'> {/* Responsive width */}
                                <button 
                                    className='btn btn-primary btn-lg w-100'  // Bootstrap button classes for size and full width
                                    onClick={handleAuth}
                                    style={{
                                        fontSize: '1.5rem', // Larger font size
                                        padding: '15px 30px', // Larger padding for bigger button
                                        borderRadius: '25px', // Rounded corners
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Subtle shadow for depth
                                    }}
                                >
                                    Authorize
                                </button>
                            </div>
                        </div>                    
                    ) : (
                        <>
                            <div className='row'>
                                <div className='col-4 d-flex justify-content-center align-items-center'>
                                    <button 
                                    className='btn btn-link' 
                                    onClick={() => setWeekOffset(weekOffset + 1)}
                                    aria-label='Previous Week'
                                    >
                                    <i className='bi bi-chevron-left'></i> {/* Bootstrap icon for left chevron */}
                                    </button>
                                </div>
                                <div className='col-4 d-flex justify-content-center align-items-center'>
                                    <h2 className="my-4">{getCurrentWeekRange(weekOffset)}</h2>
                                </div>
                                <div className='col-4 d-flex justify-content-center align-items-center'>
                                    <button 
                                    className='btn btn-link' 
                                    onClick={() => setWeekOffset(weekOffset - 1)}
                                    aria-label='Next Week'
                                    >
                                    <i className='bi bi-chevron-right'></i> {/* Bootstrap icon for right chevron */}
                                    </button>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-4 d-flex align-items-center justify-content-center'>
                                    <CircularBar 
                                        value={totalSteps}
                                        maxValue={25000}
                                    />
                                </div>
                                <div className='col-md-4'>
                                    <div className="mb-4">
                                    <Cards 
                                        title="Total Distance"
                                        value={`${totalDistance.toFixed(2)} km`}
                                    />
                                    </div>
                                    <div>
                                    <Cards 
                                        title="Total Calories"
                                        value={`${totalCalories.toFixed(2)} cal`}
                                    />
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <HeatMap monthlyData={monthlySteps} onDateClick={handleDateClick} />
                                </div>
                            </div>

                            {showDetailsModal && (
                                <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Date Details</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {detailsData && (
                                            <>
                                                <h5>Steps: {detailsData.steps}</h5>
                                                <p>Date: {detailsData.date}</p>
                                                {/* You can add more details you want to display here */}
                                            </>
                                        )}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            )}

                            <div className='row mb-3 mt-4' style={{ display: 'flex', alignItems: 'stretch' }}>
                                <div className='col-6'>
                                    <BarChartUi 
                                        labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                                        data={dailySteps}
                                        title="Step Counts"
                                        bgColor="#8884d8"
                                        dataKey="steps"
                                    />
                                </div>
                                <div className='col-6'>
                                    <BarChartUi
                                        labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                                        data={dailyDistance}
                                        title="Distance"
                                        bgColor="#82ca9d"
                                        dataKey="distance"
                                    />
                                </div>
                            </div>
                            <div className='row mb-3' style={{ display: 'flex', alignItems: 'stretch' }}>
                                <div className='col-12'>
                                    <BarChartUi
                                        labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                                        data={dailyCalories}
                                        title="Calories"
                                        bgColor="#82ca9d"
                                        dataKey="calories"
                                    />
                                </div>
                            </div>  
                        </>
                    )}                       
                </div>
            </div>
        </div>
    )
}