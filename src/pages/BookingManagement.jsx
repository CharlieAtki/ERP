import React, {useEffect} from "react";
import NavigationBar from "../components/navigationBar.jsx";
import {useNavigate} from "react-router-dom";
import BusinessCreationForm from "../components/businessCreationForm.jsx";
import BusinessDataDisplay from "../components/businessDataDisplay.jsx";
import BusinessCodeInput from "../components/businessCodeInput.jsx";
import EmployeeDisplay from "../components/employeeDisplay.jsx";
function BookingManagement() {
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
                if (!data.valid) {
                    navigate('/accountManagement');
                }
                // If an error occurs, redirect the user to the login page
            } catch (error) {
                navigate('/accountManagement');
            }
        };

        checkLoginStatus();
    }, [navigate]);
    return (
        <>
            <NavigationBar title={"Dashboard"} subtitle={"Where Metrics Are Managed"} />
            <div className="p-6 pt-2 space-y-6">
                <BusinessDataDisplay />
                <div className="grid grid-cols-2 gap-6 ">
                    <BusinessCreationForm />
                    <div className="space-y-6">
                        <BusinessCodeInput />
                        <EmployeeDisplay />
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookingManagement;

// For reference:

// This page is used to input different values
// This data will be used to work out specific metrics
// Mathematical operations will be carried out on the data for budgeting and forecasting