import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import ShopNavigationBar from "../components/shop/shopNavigationBar.jsx";

const Shop = () => {
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
                if (!data.valid || (data.user && data.user.accessType !== 'Shop')) {
                    navigate('/customerAccountManagement');
                }
                // If an error occurs, redirect the user to the login page
            } catch (error) {
                navigate('/customerAccountManagement');
            }
        };

        checkLoginStatus();
    }, [navigate]);

    // If the user is logged in, render the UI / Page
    return (
        <div>
            <ShopNavigationBar title={"Apprise Bookings"} subtitle={"Holidays Made Simple"}/>
        </div>
    )
}

export default Shop