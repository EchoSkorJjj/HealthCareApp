import React, { useEffect, useState, useRef } from 'react';
import '../../../assets/styles/private_styles/Dashboard.css';
import BarChartUi from '../../components/barchart/BarChart';
import Cards from '../../components/cards/Cards';
import CircularBar from '../../components/circularbar/CircularBar';
import HeatMap from '../../components/heatmap/HeatMap';
import useFitnessStore from '../../../features/store/FitnessStore';
import { useNavigate } from 'react-router-dom';
import ChevronLeft from 'bootstrap-icons/icons/chevron-left.svg';
import ChevronRight from 'bootstrap-icons/icons/chevron-right.svg';
import PersonWalking from 'bootstrap-icons/icons/person-walking.svg';



export default function Dashboard() {
    const navigate = useNavigate();
    const initialFetch = useRef(false);
    const setAccessToken = useFitnessStore((state) => state.setAccessToken);
    const hasAccessToken = useFitnessStore((state) => state.hasAccessToken);
    const [authCode, setAuthCode] = useState(false);

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

    useEffect(() => {
        const fetchInitialData = async () => {
            if (!initialFetch.current) {
                initialFetch.current = true;
                const auth = await initializeAuth();
                if (auth) {
                    initialFetch.current = false;
                    setAccessToken(true);
                    navigate('/dashboard')
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
                const stepData = await fetch(`${baseUrl}/api/fitness/getStepData`, {
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
                const monthlyData = await fetch(`${baseUrl}/api/fitness/getStepData`, {
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
                if (!monthlyData.dailySteps) {
                    setMonthlySteps([28000,28000, 28000, 28000, 28000, 28000, 28000])
                    setDailySteps([400,400,400,400,400,400,400]);
                    setTotalSteps(196000)
                } else {
                    setMonthlySteps(monthlyData.dailySteps);
                    setDailySteps(stepData.dailySteps);
                    setTotalSteps(stepData.totalSteps);
                }

                // Fetch distance data
                const distanceData = await fetch(`${baseUrl}/api/fitness/getDistanceData`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        weekOffset: weekOffset, 
                    }),
                });
                if (!distanceData.totalDistance) {
                    setDailyDistance([10000,10000,10000,10000,10000,10000,10000]);
                    setTotalDistance(70000);
                } else {
                    setDailyDistance(distanceData.dailyDistance);
                    setTotalDistance(distanceData.totalDistance);
                }
                
                // Fetch calorie data
                const calorieData = await fetch(`${baseUrl}/api/fitness/getCaloriesData`, {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify({ 
                        weekOffset: weekOffset, 
                    }),
                });
                if (!calorieData.dailyCalories) {
                    setDailyCalories([2000,1000,2000,1000,2000,1000,2000])
                    setTotalCalories(11000);
                } else {
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
                <div className="container">
                    {dailySteps.length > 0 && dailyDistance.length > 0 && dailyCalories.length > 0 && monthlySteps.length > 0 ? (
                        <>
                        <div className="row">
                            <div className="d-flex col-4 justify-content-end align-items-center">
                                <img onClick={() => setWeekOffset(weekOffset + 1)} aria-label="Previous Week" src={ChevronLeft} alt="Previous" 
                                    style={{width:"40px", height:"40px", cursor: "pointer"}}
                                />
                            </div>

                            <div className="col-4">
                                <h2 className="my-4">{getCurrentWeekRange(weekOffset)}</h2>
                            </div>
                            <div className="d-flex col-4 justify-content-start align-items-center">
                                <img onClick={() => setWeekOffset(weekOffset - 1)} aria-label="Next Week" src={ChevronRight} alt="Next" 
                                    style={{width:"40px", height:"40px", cursor: "pointer"}}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-auto'>
                                <CircularBar 
                                value={totalSteps}
                                maxValue={25000} // or whatever your goal is
                                label={`${totalSteps}` <img src={PersonWalking} alt="Person Walking" style={{width:"40px", height:"40px"}}/>}
                                />
                            </div>
                            <div className='col-auto'>
                                <HeatMap monthlyData={monthlySteps} />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-md-4'>
                                <Cards 
                                    title="Total Steps"
                                    value={`${totalSteps} steps`}
                                />
                            </div>
                            <div className='col-md-4'>
                                <Cards 
                                    title="Total Distance"
                                    value={`${totalDistance.toFixed(2)} km`}
                                />
                            </div>
                            <div className='col-md-4'>
                                <Cards 
                                    title="Total Calories"
                                    value={`${totalCalories.toFixed(2)} cal`}
                                />
                            </div>
                        </div>
                        <div className='row mb-3' style={{ display: 'flex', alignItems: 'stretch' }}>
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
                    ) : (
                        // <div className='row d-flex justify-content-center bg-black'>
                        //     <button className='col-4' onClick={handleAuth}>Authorize</button>
                        // </div>
                        <div className='container' style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <button 
                                onClick={handleAuth} 
                                style={{
                                padding: '10px 20px', // Larger padding for a bigger button
                                fontSize: '1.5rem', // Larger font size
                                width: '50%', // Adjust width as needed
                                minWidth: '200px', // Ensures the button doesn't get too small
                                display: 'block', // Needed to apply margin auto for centering
                                }}
                            >
                                Authorize
                            </button>
                        </div>



                    )}
                </div>
            </div>
        </div>
    )
}