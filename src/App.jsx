import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import Dashboard from './pages/Dashboard';
const App = () => {
    // React Routing - Used to manage the different "pages" and "components" within them
    // path="/" is used to represent the homepage. In other words the default page
    return (
        <Router>
            <Routes>
                <Route path="/dashboard" element={<Hero title={"ERP System"} subtitle={"Random description"} />} />
            </Routes>
        </Router>
    );
};

export default App;