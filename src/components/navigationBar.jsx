import { useLocation, Link } from 'react-router-dom';

const NavigationBar = ({ title, subtitle}) => {
    const location = useLocation(); // Get the current location (URL path)

    // Function that compares the buttons path url and the current url
    // Used to improve user-feedback as if the url's match, the button is indigo rather than grey
    const getButtonClass = (path) => {
        return location.pathname === path
            // If truthy (the URL is the same as the buttons path, active state (change the colour)
            ? 'bg-indigo-700 text-white rounded-full shadow-2xl shadow-indigo-500/50 px-6 py-3' // Active state
            // If falsy (the URL does not match the buttons path, inactive state (don's change the colour)
            : 'bg-gray-700 text-white rounded-full shadow-2xl shadow-gray-500/50 px-6 py-3 hover:bg-indigo-700 transition-all'; // Inactive state
    };

    return (
        <section className="flex justify-between items-center px-8 py-8">
            {/* Title on the left */}
            {/* sm:text-2xl - On small screens, the text is 2xl*/}
            {/* md:text-2xl - On medium screens, the text is 4xl*/}
            <div className="text-left">
                <h1 className="font-extrabold text-indigo-700 sm:text-2xl md:text-4xl">
                    {title}
                </h1>
                <h4 className="text-gray-700 sm:text-md md:text-xl">
                    {subtitle}
                </h4>
            </div>

            {/* Buttons on the right */}
            <div className="flex space-x-8 p-2">
                {/* Using React client-side routing, if the button is pressed, route the user to /dashboard */}
                <Link to="/dashboard">
                    <button className={getButtonClass("/dashboard")}>Dashboard</button>
                </Link>
                {/* Using React client-side routing, if the button is pressed, route the user to /bookingManagement */}
                <Link to="/bookingManagement">
                    <button className={getButtonClass("/bookingManagement")}>Booking</button>
                </Link>
                {/* Using React client-side routing, if the button is pressed, route the user to / */}
                <Link to="/">
                    <button className={getButtonClass("/")}>Home</button>
                </Link>
            </div>
        </section>
    );
};

// Exporting the component so it can be used multiple times across the codebase
export default NavigationBar;
