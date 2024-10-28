import Hero from '../components/Hero';
import React from "react";
import AreaChartComponents from "../components/areaChart.jsx";
import LineChartComponent from "../components/lineChart.jsx";
import BarChartComponent from "../components/barChart.jsx";

// This "page" is where the different React "components" will be incorporated together
// "Hero" refers to function, which creates a banner.
const Dashboard = () => {
    return (
        <>
            <Hero title={"ERP System"} subtitle={"Tailored for retail businesses"} />
            <div className="flex space-x-8">
                <AreaChartComponents />
                <LineChartComponent />
                <BarChartComponent />
            </div>
        </>
    );
};

export default Dashboard;