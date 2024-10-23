import {
    AreaChart,
    Area,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

// data for reference
const testData = [
    {
        name: 'Jan',
        product1: 4000,
        product2: 2400
    },
    {
        name: 'Feb',
        product1: 3000,
        product2: 2210
    },
    {
        name: 'Mar',
        product1: 2000,
        product2: 2290
    },
    {
        name: 'Apr',
        product1: 2780,
        product2: 2000
    },
    {
        name: 'May',
        product1: 1890,
        product2: 2181
    },
    {
        name: 'Jun',
        product1: 2390,
        product2: 2500
    }
]
const AreaChartComponents = () => {
    return (
        // PS made the graph responsive once it's been added into a container

        // YAxis adds the YAxi label onto the graph
        // XAXis adds the XAxi label onto the graph
        // CartesianGrid adds a grid onto the graph, but "stokeDasharray" changes the grids visuals into hyphens
        // Tooltip creates an additional UI element for when you hover over values in the graph
        // Legend adds a key to the bottom on the graph. This provides additional information

        // The 2 Area elements visualise the data provided onto the graph.
        // Stroke and fill are for the colour of the visualised data on the graph
        // StackId allows the visualised data to be added on top of one another.

        //<ResponsiveContainer width="100%" height="100%">
            <AreaChart width={500} height={500} data={testData}>
                <YAxis />
                <XAxis dataKey="name" />
                <CartesianGrid strokeDasharray="5 5" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                <Area
                    type="monotone"
                    dataKey="product1"
                    stroke="#2563eb"
                    fill="#3b82f6"
                    stackId="1"
                />

                <Area
                    type="monotone"
                    dataKey="product2"
                    stroke="#7c3aed"
                    fill="#8b5cf6"
                    stackId="1"
                />
            </AreaChart>
       // </ResponsiveContainer>
    )
};


// Custom Tooltip - Changes the UI of the tooltip to make it more intuitive
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
             <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
                 <p className="text-medium text-lg text-white">{label}</p>
                 <p className="text-sm text-blue-400">
                    product 1:
                    <span className="ml-2">${payload[0].value}</span>
                 </p>
                 <p className="text-sm text-indigo-400">
                     Product 2:
                     <span className="ml-2">${payload[1].value}</span>
                 </p>
             </div>
        );
    }
};

// exporting the component.
// This allows it to be used multiple times across my application without needing the code to be rewritten.
export default AreaChartComponents;