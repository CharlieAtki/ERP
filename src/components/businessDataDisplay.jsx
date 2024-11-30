import { useState, useEffect } from "react";

const BusinessDataDisplay = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <p>Error: {error}</p>;
    }

    // Define the metrics to display
    // This allows for dynamic rendering of any number of weeks
    // Easy addition or removal of metrics
    // Consistent formatting across the table
    const metrics = [
        { key: 'totalBookings', label: 'Total Bookings' },
        { key: 'occupancyRate', label: 'Occupancy Rate', suffix: '%' },
        { key: 'cancellationRate', label: 'Cancellation Rate', suffix: '%' },
        { key: 'bookingLeadTime', label: 'Booking Lead Time' },
        { key: 'noShowRate', label: 'No Show Rate', suffix: '%' },
        { key: 'revenuePerBooking', label: 'Revenue Per Booking' },
        { key: 'bookingConversionRate', label: 'Booking Conversion Rate', suffix: '%' },
        { key: 'averageBookingValue', label: 'Average Booking Value' },
        { key: 'paymentStatus', label: 'Payment Status' },
        { key: 'costPerBooking', label: 'Cost Per Booking' },
        { key: 'customerRetentionRate', label: 'Customer Retention Rate', suffix: '%' },
        { key: 'seasonalBookingTrends', label: 'Seasonal Booking Trend' },
        { key: 'demandForecasting', label: 'Demand Forecasting' }
    ];

    return (
        <div className="p-6 border-2 border-gray-700 rounded-2xl">
            {/* Header section */}
            <div className="mb-4">
                <h2 className="font-bold text-indigo-700 text-2xl">Current Weeks Data</h2>
                <p className="text-gray-700 text-lg">Business Metrics Overview</p>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    {/* Table Header */}
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left border">Metric</th>
                            {/* This creates a header column for each week of data
                             Index + 1 creates labels like "Week 1", "Week 2"
                             item._id is used as a key if available, falls back to index */}
                            {data.map((item, index) => (
                                <th
                                    key={item._id || index}
                                    className="px-4 py-2 text-center border"
                                >
                                    <div className="text-sm">
                                        {item.weekStartDate} - {item.weekEndDate}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {/* Explanation:
                         First metrics.map() creates a row for each metric.
                         Nested data.map creates a cell for each week's data
                         Item[metric.key] dynamically retrieves the value for each metric
                         Optional suffix, which is an optional attribute within each object (like %) can be added to the value */}
                        {metrics.map((metric) => (
                            <tr key={metric.key} className="border-b">
                                {/* Metric label column */}
                                {/* First map is iterating through each metric defined within the array,
                                 and creates a row for each metric. As shown below, each row will use the "label" value from the metric object  */}
                                <td className="px-4 py-2 font-semibold text-gray-700 border">
                                    {metric.label}
                                </td>

                                {/* Data columns for each week */}
                                {/* Second nested map: creates a cell for each week's data */}

                                {/* Further explanation:
                                 1.The initial map (metrics.map()) iterates through the metrics array (with keys like 'OccupancyRate')
                                 2.For each metric, it creates a row
                                 3. Inside that row, data.map() iterates through each data item
                                 4. {item[metric.key]} dynamically accesses the value for that specific key in the current data item

                                 Example to illustrate:
                                 If metric is { key: 'occupancyRate', label: 'Occupancy Rate', suffix: '%'
                                 And item is {occupancyRate: 75, ...

                                 item[metric.key] translates to item['occupancyRate']
                                 Which returns 75 */}

                                {data.map((item, index) => (
                                    <td
                                        key={item._id || index}
                                        className="px-4 py-2 text-center border text-gray-700"
                                    >
                                        {item[metric.key]}
                                        {metric.suffix || ''}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BusinessDataDisplay;

// Disclosure:
// During the creation of the table, I used external resources to aid its development.
// Prior to the creation of the table, I had limited knowledge of how to dynamically create a React table.
// By using Claude (AI Model) to explain the functionality of map() within the React component,
// I now understand the functionality/purpose of the code. I plan on incorporating this knowledge within other elements of my program