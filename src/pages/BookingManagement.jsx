import React from "react";
import DynamicTable from "../components/test.jsx";
import NavigationBar from "../components/navigationBar.jsx";
const BookingManagement = () => {
    return (
        <>
            <NavigationBar title={"Dashboard"} subtitle={"Where Metrics Are Managed"} />
            <DynamicTable />
        </>
    );
};

export default BookingManagement;

// For reference:

// This page is used to input different values
// This data will be used to work out specific metrics
// Mathematical operations will be carried out on the data for budgeting and forecasting