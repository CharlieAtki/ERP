import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookingManagement from './pages/BookingManagement.jsx';
import Dashboard from './pages/Dashboard';
import AccountManagement from "./pages/AccountManagement.jsx";
import ExampleComponent from "./pages/testPage.jsx";
import TwoFactorAuthentication from "./pages/TwoFactorAuthentication.jsx";

const App = () => {
    // React Routing - Used to manage the different "pages" and "components" within them
    // path="/" is used to represent the homepage. In other words the default page
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AccountManagement />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/bookingManagement" element={<BookingManagement />} />
                <Route path="/twoFactorAuthentication" element={<TwoFactorAuthentication />} />
                <Route path="/test" element={<ExampleComponent />} />
            </Routes>
        </Router>
    );
};

export default App;