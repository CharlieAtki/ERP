import {useState} from "react";
import {getWeekRange} from "../../server/utils/getWeekRange.js";

const BusinessCreationForm = () => {
    // Initial state object
    const initialState = {
        totalBookings: "",
        occupancyRate: "",
        cancellationRate: "",
        bookingLeadTime: "",
        noShowRate: "",
        revenuePerBooking: "",
        bookingConversionRate: "",
        averageBookingValue: "",
        paymentStatus: "",
        costPerBooking: "",
        customerRetentionRate: "",
        seasonalBookingTrends: "",
        demandForecasting: "",
    };

    // Add each metric which will have an input here
    const [input, setInput] = useState(initialState); // state input fields -> This data is used to create or modify a business document

    const { weekStartDate, weekEndDate } = getWeekRange(new Date()); // Get the start and end date of the week

    // Handler used for resting the input fields
    const handleReset = () => {
        setInput(initialState); // Reset input fields to their initial state
    }

    // handler used to update the values stored in the input useState
    // when there is an adjustment made in the input field.
    const handleChange = (event) => {
        const { name, value } = event.target; // name (name of the input field) - value (value in the input field)
        setInput((prev) => ({ ...prev, [name]: value })); // updating the useState, but keeping the value, which are unchanged
    }

    const sendData = async () => {
        let hasError = false; // Track whether there are any errors in the input fields

        if (hasError) return
        try {
            const response = await fetch("http://localhost:3000/api/business/new-business", {
                method: "POST", // Defining the method the API uses
                headers: { "Content-Type": "application/json" }, // Defining the data type
                credentials: 'include', // Allow cookie exchange
                body: JSON.stringify({
                    totalBookings: input.totalBookings,
                    occupancyRate: input.occupancyRate,
                    cancellationRate: input.cancellationRate,
                    bookingLeadTime: input.bookingLeadTime,
                    noShowRate: input.noShowRate,
                    revenuePerBooking: input.revenuePerBooking,
                    bookingConversionRate: input.bookingConversionRate,
                    averageBookingValue: input.averageBookingValue,
                    paymentStatus: input.paymentStatus,
                    costPerBooking: input.costPerBooking,
                    customerRetentionRate: input.customerRetentionRate,
                    seasonalBookingTrends: input.seasonalBookingTrends,
                    demandForecasting: input.demandForecasting,
                    revenueForecasting: input.revenueForecasting
                }) // Converts the JS object into a JSON string, making it ready for HTTP transmission
            });

            if (response.ok) {
                location.reload(); // Refresh the webpage once the data has been modified
                const result = await response.json(); // Turing the JS object back into json
                if (result.success) {
                    console.log("Business Created Successfully!");
                } else {
                    console.error(result.message); // error message from the backend
                }
            } else {
                console.error(response.message); // error message from the backend
            }
        } catch (error) {
            console.error('Error sending business creation error', error); // Error message for debugging
        }
    }

    return (
        <section className="text-center p-6 w-full border-2 border-gray-700 text-lg rounded-3xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6">
                <div className="grid col-span-1 text-left">
                    <label className="font-extrabold text-indigo-700 sm:text-2xl md:text-2xl">Business Creation & Data Modification</label>
                    <label className="text-gray-700 sm:text-md md:text-lg"> Where Business Metrics Can Be Modified</label>
                </div>
                <span className="text-gray-700 sm:text-md md:text-md">{`${weekStartDate} - ${weekEndDate}`}</span>
            </div>
            <div className="grid grid-flow-row-dense grid-cols-3 gap-4">
                <div>
                    <h3 className="text-left text-gray-700 sm:text-md md:text-md">Total Bookings</h3>
                    <input
                        type="text"
                        name="totalBookings"
                        value={input.totalBookings}
                        onChange={handleChange}
                        placeholder="Total Bookings"
                        className={'border border-gray-300 p-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 w-full bg-gray-100 placeholder-gray-500'}

                    />
                </div>
                <div>
                    <h3 className="text-left text-gray-700 sm:text-md md:text-md">Occupancy Rate</h3>
                    <input
                        type="text"
                        name="occupancyRate"
                        value={input.occupancyRate}
                        onChange={handleChange}
                        placeholder="Occupancy Rate"
                        className={'border border-gray-300 p-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 w-full bg-gray-100 placeholder-gray-500'}

                    />
                </div>
                <div>
                    <h3 className="text-left text-gray-700 sm:text-md md:text-md">Cancellation Rate</h3>
                    <input
                        type="text"
                        name="cancellationRate"
                        value={input.cancellationRate}
                        onChange={handleChange}
                        placeholder="Cancellation Rate"
                        className={'border border-gray-300 p-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 w-full bg-gray-100 placeholder-gray-500'}

                    />
                </div>
                <div>
                    <h3 className="text-left text-gray-700 sm:text-md md:text-md">Booking Lead Time</h3>
                    <input
                        type="text"
                        name="bookingLeadTime"
                        value={input.bookingLeadTime}
                        onChange={handleChange}
                        placeholder="Booking Lead Time"
                        className={'border border-gray-300 p-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 w-full bg-gray-100 placeholder-gray-500'}

                    />
                </div>
                <div>
                    <h3 className="text-left text-gray-700 sm:text-md md:text-md">No Show Rate</h3>
                    <input
                        type="text"
                        name="noShowRate"
                        value={input.noShowRate}
                        onChange={handleChange}
                        placeholder="No Show Rate"
                        className={'border border-gray-300 p-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 w-full bg-gray-100 placeholder-gray-500'}

                    />
                </div>
                <div>
                    <h3 className="text-left text-gray-700 sm:text-md md:text-md">Revenue Per Booking</h3>
                    <input
                        type="text"
                        name="revenuePerBooking"
                        value={input.revenuePerBooking}
                        onChange={handleChange}
                        placeholder="Revenue Per Booking"
                        className={'border border-gray-300 p-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 w-full bg-gray-100 placeholder-gray-500'}

                    />
                </div>
                <div>
                    <h3 className="text-left text-gray-700 sm:text-md md:text-md">Booking Conversion Rate</h3>
                    <input
                        type="text"
                        name="bookingConversionRate"
                        value={input.bookingConversionRate}
                        onChange={handleChange}
                        placeholder="Booking Conversion Rate"
                        className={'border border-gray-300 p-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 w-full bg-gray-100 placeholder-gray-500'}

                    />
                </div>
                <div>
                    <h3 className="text-left text-gray-700 sm:text-md md:text-md">Average Booking Value</h3>
                    <input
                        type="text"
                        name="averageBookingValue"
                        value={input.averageBookingValue}
                        onChange={handleChange}
                        placeholder="Average Booking Value"
                        className={'border border-gray-300 p-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 w-full bg-gray-100 placeholder-gray-500'}

                    />
                </div>
                <div>
                    <h3 className="text-left text-gray-700 sm:text-md md:text-md">Payment Status</h3>
                    <input
                        type="text"
                        name="paymentStatus"
                        value={input.paymentStatus}
                        onChange={handleChange}
                        placeholder="Payment Status"
                        className={'border border-gray-300 p-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 w-full bg-gray-100 placeholder-gray-500'}

                    />
                </div>
                <div>
                    <h3 className="text-left text-gray-700 sm:text-md md:text-md">Cost Per Booking</h3>
                    <input
                        type="text"
                        name="costPerBooking"
                        value={input.costPerBooking}
                        onChange={handleChange}
                        placeholder="Cost Per Booking"
                        className={'border border-gray-300 p-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 w-full bg-gray-100 placeholder-gray-500'}

                    />
                </div>
                <div>
                    <h3 className="text-left text-gray-700 sm:text-md md:text-md">Customer Retention Rate</h3>
                    <input
                        type="text"
                        name="customerRetentionRate"
                        value={input.customerRetentionRate}
                        onChange={handleChange}
                        placeholder="Customer Retention Rate"
                        className={'border border-gray-300 p-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 w-full bg-gray-100 placeholder-gray-500'}

                    />
                </div>
                <div>
                    <h3 className="text-left text-gray-700 sm:text-md md:text-md">Seasonal Booking Trends</h3>
                    <input
                        type="text"
                        name="seasonalBookingTrends"
                        value={input.seasonalBookingTrends}
                        onChange={handleChange}
                        placeholder="Seasonal Booking Trends"
                        className={'border border-gray-300 p-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 w-full bg-gray-100 placeholder-gray-500'}

                    />
                </div>
                <div>
                    <h3 className="text-left text-gray-700 sm:text-md md:text-md">Demand Forecasting</h3>
                    <input
                        type="text"
                        name="demandForecasting"
                        value={input.demandForecasting}
                        onChange={handleChange}
                        placeholder="Demand Forecasting"
                        className={'border border-gray-300 p-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 w-full bg-gray-100 placeholder-gray-500'}

                    />
                </div>
            </div>
            <div className="p-6 space-x-8">
                <button
                    onClick={sendData}
                    className='w-1/4 bg-gray-700 text-white rounded-full shadow-2xl shadow-gray-500/50 px-6 py-3 hover:bg-indigo-700 transition-all transform hover:scale-105'>
                    Submit
                </button>
                <button
                    onClick={handleReset} // reset handler
                    className='w-1/4 bg-gray-700 text-white rounded-full shadow-2xl shadow-gray-500/50 px-6 py-3 hover:bg-indigo-700 transition-all transform hover:scale-105'>
                    Reset
                </button>
            </div>
        </section>
    )
}

export default BusinessCreationForm