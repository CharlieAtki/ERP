import React from "react";
import LoginFrom from "../components/loginForm.jsx";
import NavigationBar from "../components/navigationBar.jsx";

const AccountManagement = () => {
    return (
        <>
            <NavigationBar title="Account Management" subtitle="Create Your Account" />
            <LoginFrom />
        </>
    );
};

export default AccountManagement;

// For reference:

// This page is for the account management.
// This includes: User login and account creation
// Within both of these strands, 2FA and password hashing REST APIs must be incorporated