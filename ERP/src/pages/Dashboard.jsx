import NavigationBar from "../components/ERPSystem/navigationBar.jsx";
import React, {useEffect} from "react";
import AreaChartComponents from "../components/ERPSystem/areaChart.jsx";
import LineChartComponent from "../components/ERPSystem/lineChart.jsx";
import BarChartComponent from "../components/ERPSystem/barChart.jsx";
import {useNavigate} from "react-router-dom";


// "space-y-8 p-4" is used to ensure the distance between each of the child elements is equal.
// "space-y-8" refers to the horizontal distance between each of the graphs,
// "p-4" refers to the padding on all side of the element

// The "flex space-x-4" utility class refers to the spacing and how items are managed
// "flex" is the class that applies to the display: flex style to the element. It makes the element a flex container,
// allowing its child elements (flex items) to be arranged in a row or column.
// Effect: When you use flex, the direct children of that element become flex items,
// which can be aligned, spaced, and distributed according to flexbox rules.
// "space-x-4" refers to the added horizontal spacing (margin) between child elements,
// that are flex items within a flex container.
// It creates a horizontal margin between each of the child elements within the container.
// As the row has multiple items, this class helps visually separate them.

// "w-1/3 h-[33vw]" is used to make the square graphs responsive.
// By setting equal dimensions on each div containing your chart,
// you ensure each ResponsiveContainer inside adapts to these square dimensions,
// making the graphs display as squares.

// border-gray-300 rounded-lg - This creates a grey rounded border around each element of the UI,
// which given a more modular/compartmentalised design ascetic
// shadow-md adds a shadow around the border. This gives the graph components more presence



function Dashboard() {
    const navigate = useNavigate(); // React navigation component

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                // fetching from the server at the URL input,
                // this API will check the session to see if the user is logged in
                const response = await fetch('http://localhost:3000/', {
                    credentials: 'include', // Used to ensure CORS works as expected
                });
                // This is the response from the server
                const data = await response.json();

                // if the data.valid attribute !== true, redirect to the login page
                if (!data.valid || (data.user && data.user.accessType !== 'ERP')) {
                    navigate('/accountManagement');
                }
                // If an error occurs, redirect the user to the login page
            } catch (error) {
                navigate('/accountManagement');
            }
        };

        checkLoginStatus();
    }, [navigate]);

    // If the user is logged in, render the UI / Page
    return (
        <>
            <div>
                <NavigationBar title={"Dashboard"} subtitle="Where Data is Visualised" className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 text-white p-4" />

                <div className="space-y-8 p-4">
                    {/* First row of charts */}
                    <div className="flex space-x-4 gap-6">
                        <div
                            className="w-full h-[25vw] border border-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
                            <h3 className="text-l font-sans text-gray-600 mb-2 text-center">Total Bookings vs Revenue Per Booking</h3>
                            <AreaChartComponents metricOne={"totalBookings"} metricTwo={"revenuePerBooking"} metricOneUnit={"Units"} metricTwoUnit={"GBP"}/>
                        </div>
                        <div
                            className="w-full h-[25vw] border border-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
                            <h3 className="text-l font-sans text-gray-600 mb-2 text-center">Cost Per Booking vs Revenue Per Booking</h3>
                            <BarChartComponent metricOne={"costPerBooking"} metricTwo={"revenuePerBooking"} metricOneUnit={"GBP"} metricTwoUnit={"GBP"}/>
                        </div>
                        <div
                            className="w-full h-[25vw] border border-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
                            <h3 className="text-l font-sans text-gray-600 mb-2 text-center">No Show Rate vs Cancellation Rate</h3>
                            <AreaChartComponents metricOne={"noShowRate"} metricTwo={"cancellationRate"} metricOneUnit={"%"} metricTwoUnit={"%"}/>
                        </div>
                    </div>

                    {/* Second row of charts */}
                    <div className="flex space-x-4 gap-6">
                        <div
                            className="w-1/4 h-[25vw] border border-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
                            <h3 className="text-l font-sans text-gray-600 mb-2 text-center">Customer Retention Rate vs Booking Lead Time</h3>
                            <LineChartComponent metricOne={"customerRetentionRate"} metricTwo={"bookingLeadTime"} metricOneUnit={"%"} metricTwoUnit={"Days"} />
                        </div>
                        <div
                            className="w-1/4 h-[25vw] border border-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
                            <h3 className="text-l font-sans text-gray-600 mb-2 text-center">Total Bookings vs Demand Forecasting</h3>
                            <BarChartComponent metricOne={"totalBookings"} metricTwo={"demandForecasting"} metricOneUnit={"Units"} metricTwoUnit={"Units"} />
                        </div>
                        <div
                            className="w-1/4 h-[25vw] border border-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
                            <h3 className="text-l font-sans text-gray-600 mb-2 text-center">Average Booking Value vs Cost Per Booking</h3>
                            <AreaChartComponents metricOne={"averageBookingValue"} metricTwo={"costPerBooking"} metricOneUnit={"GBP"} metricTwoUnit={"GBP"} />
                        </div>
                        <div
                            className="w-1/4 h-[25vw] border border-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
                            <h3 className="text-l font-sans text-gray-600 mb-2 text-center">Seasonal Booking Trends vs Occupancy Rate</h3>
                            <LineChartComponent metricOne={"seasonalBookingTrends"} metricTwo={"occupancyRate"} metricOneUnit={""} metricTwoUnit={"%"}/>
                        </div>

                    </div>

                    {/* Third row of charts */}
                    <div className="flex space-x-4 gap-6">
                        <div
                            className="w-3/4 h-[25vw] border border-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
                            <h3 className="text-l font-sans text-gray-600 mb-2 text-center">Booking Conversion Rate vs Cancellation Rate</h3>
                            <AreaChartComponents metricOne={"bookingConversionRate"} metricTwo={"cancellationRate"} metricOneUnit={"%"} metricTwoUnit={"%"} />
                        </div>
                        <div
                            className="w-1/4 h-[25vw] border border-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
                            <h3 className="text-l font-sans text-gray-600 mb-2 text-center">Booking Lead Time vs Seasonal Booking Trends</h3>
                            <LineChartComponent metricOne={"bookingLeadTime"} metricTwo={"seasonalBookingTrends"} metricOneUnit={"Days"} metricTwoUnit={""} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Dashboard;

// Things to add to this module:

// Within each graph component file, add the functionality to fetch data from the mongoDB database via an API.
// Reference server functionality has already been developed within the "server" JS file.
// Use this to develop the other APIs to allow the program to use CRUD operations.