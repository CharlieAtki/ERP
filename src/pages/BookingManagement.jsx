import React from "react";
import Hero from "../components/Hero";
import DynamicTable from "../components/test.jsx";
const BookingManagement = () => {
    return (
        <>
            <Hero title={"ERP System"} subtitle={"Booking Management"} />
            <DynamicTable />
        </>
    );
};

export default BookingManagement;

// For reference:

// This page is used to input different values
// This data will be used to work out specific metrics
// Mathematical operations will be carried out on the data for budgeting and forecasting