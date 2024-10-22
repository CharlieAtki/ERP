import Hero from '../components/Hero';
import React from "react";

// This "page" is where the different React "components" will be incorporated together
// "Hero" refers to function, which creates a banner.
const Dashboard = () => {
    return (
        <>
            <Hero title={"ERP System"} subtitle={"Tailored for retail businesses"} />
        </>
    );
};

export default Dashboard;