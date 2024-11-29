import {useState, useEffect} from "react";

const BusinessDataDisplay = () => {
    const [data, setData] = useState([]) // Sate to store fetched data
    const [error, setError] = useState(null) // sate to handle errors
    const [loading, setLoading] = useState(true) // state to handle loading

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/business/get-weekly-data', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });

                if (!response.ok) {
                    console.error("Failed to fetch data");
                }
                const result = await response.json();
                setData(result); // Save the fetched data into the useState
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); // Stop loading once fetch has completed
            }
        };

        fetchData();
    }, []); // Run once on component mount - Eg, once the webpage is loaded

    // Handle loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <p>Error: {error}</p>;
    }

    // Render the data
    return (
        <div className="flex justify-center">
            <div className="w-full max-w-max">
                <div className="ml-2 grid col-span-1 text-left ">
                    <label className="font-bold text-indigo-700 sm:text-lg md:text-2xl">Current Weeks Data</label>
                    <label className="text-gray-700 sm:text-md md:text-lg">Where Business Metrics Are Displayed</label>
                </div>
                <div className="bg-white border-2 border-gray-700 text-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max border-collapse">
                            <thead>
                            <tr className="bg-gray-100 border-b border-gray-300">
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Business Code
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Week Start Date
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Week End Date
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Total Bookings
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Occupancy Rate
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Cancellation Rate
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Booking Lead Time
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    No Show Rate
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Revenue Per Booking
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Booking Conversion Rate
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Average Booking Value
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Payment Status
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Cost Per Booking
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Customer Retention Rate
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Seasonal Booking Trend
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Demand Forecasting
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((item) => (
                                <tr key={item._id} className="bg-gray-100 border-b border-gray-300"
                                >
                                    <td
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {item.businessCode}
                                    </td>
                                    <td
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {item.weekStartDate}
                                    </td>
                                    <td
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {item.weekEndDate}
                                    </td>
                                    <td
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {item.totalBookings}
                                    </td>
                                    <td
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {item.occupancyRate}%
                                    </td>
                                    <td
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {item.cancellationRate}%
                                    </td>
                                    <td
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {item.bookingLeadTime}
                                    </td>
                                    <td
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {item.noShowRate}%
                                    </td>
                                    <td
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {item.revenuePerBooking}
                                    </td>
                                    <td
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {item.bookingConversionRate}%
                                    </td>
                                    <td
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {item.averageBookingValue}
                                    </td>
                                    <td
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {item.paymentStatus}
                                    </td>
                                    <td
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {item.costPerBooking}
                                    </td>
                                    <td
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {item.customerRetentionRate}%
                                    </td>
                                    <td
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {item.seasonalBookingTrends}
                                    </td>
                                    <td
                                        className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {item.demandForecasting}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusinessDataDisplay