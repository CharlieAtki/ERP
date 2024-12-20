import {useLocation, Link, useNavigate} from 'react-router-dom';

const NavigationBar = ({ title, subtitle}) => {
    const location = useLocation(); // Get the current location (URL path)
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    // Function that compares the buttons path url and the current url
    // Used to improve user-feedback as if the url's match, the button is indigo rather than grey
    const getButtonClass = (path) => {
        return location.pathname === path
            // If truthy (the URL is the same as the buttons path, active state (change the colour)
            ? 'bg-indigo-700 text-white rounded-full shadow-2xl shadow-indigo-500/50 px-8 py-3 transform scale-110' // Active state
            // If falsy (the URL does not match the buttons path, inactive state (don's change the colour)
            : 'bg-gray-700 text-white rounded-full shadow-2xl shadow-gray-500/50 px-8 py-3 hover:bg-indigo-700 transition-all transform hover:scale-105'; // Inactive state
    };

    const handleLogOut = async () => {
        try {
            const response = await fetch(`${API_URL}/api/auth/clientLogout`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.message);
                navigate('/accountManagement');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error', error);
        }
    };

    return (
        <section className="flex justify-between items-center px-8 py-8 gap-x-4">
            {/* Title on the left */}
            {/* sm:text-2xl - On small screens, the text is 2xl*/}
            {/* md:text-2xl - On medium screens, the text is 4xl*/}
            <div className="text-left mr-auto">
                <h1 className="font-extrabold text-indigo-700 sm:text-2xl md:text-4xl">
                    {title}
                </h1>
                <h4 className="text-gray-700 sm:text-md md:text-xl">
                    {subtitle}
                </h4>
            </div>

            {/* Buttons on the right */}
            <div className="flex space-x-3.5 p-2">
                {/* Using React client-side routing, if the button is pressed, route the user to /dashboard */}
                <Link to="/dashboard">
                    <button className={getButtonClass("/dashboard")}>Dashboard</button>
                </Link>
                {/* Using React client-side routing, if the button is pressed, route the user to /bookingManagement */}
                <Link to="/bookingManagement">
                    <button className={getButtonClass("/bookingManagement")}>Booking</button>
                </Link>
                {/* Using React client-side routing, if the button is pressed, route the user to / */}
                <button
                    onClick={handleLogOut}
                    className={getButtonClass("/accountManagement")}>
                    Log Out
                </button>
            </div>
        </section>
    );
};

// Exporting the component, which can be used multiple times across the codebase
export default NavigationBar;
