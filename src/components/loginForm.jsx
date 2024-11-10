import {useEffect, useState} from "react";

const LoginFrom = () => {
    // input is for reading the current state value.
    // setInput is for updating the state, leading to a re-render with the new input value.
    // For example, input is what would be used within the UI,
    // but setInput is used to update the input when a condition Changes, such as new data in the input field
    const [input, setInput] = useState({ email: "", password: "" }); // state input fields
    const [savedData, setSavedData] = useState(null) // State to store data from the backend

    const [error, setError] = useState(false)

    const [passwordInputError, setPasswordInputError] = useState(false); // To track if there was an error within the password input field
    const [emailInputError, setEmailInputError] = useState(false); // To track if there was an error within the email input field

    // Function to get input field class based on error state
    // Used to improve user feedback + inform the user, which input is incorrect
    const getEmailInputClass = (hasError) => {
        return hasError
            ? 'border-red-500'  // If there's an error, apply red border
            : 'border-gray-300'; // If no error, apply default border
    };

    const getPasswordInputClass = (hasError) => {
        return hasError
            ? 'border-red-500'  // If there's an error, apply red border
            : 'border-gray-300'; // If no error, apply default border
    };


    // This asynchronous function is used to send and then receive data from backend
    // Data, such as email and password will be transferred
    async function sendData() {
        // Reset error states before submitting
        setEmailInputError(false);
        setPasswordInputError(false);

        // Check for empty input fields
        if (!input.email) {
            setEmailInputError(true); // Set email error to true if empty
        }
        if (!input.password) {
            setPasswordInputError(true); // Set password error to true if empty
        }

        // If there are errors, don't proceed with sending data
        if (input.email === "" || input.password === "") {
            setError(true); // If fields are empty, show the error state
            return; // Prevent sending data
        }

        try {
            // fetch operation is asynchronous, the process will wait until the response
            const response = await fetch("http://localhost:3000/add-client", {
                // Defining that the method is POST (sending data),
                // Headers are telling the server that JSON is being sent
                method: "POST",
                headers: { "Content-Type": "application/json" }, // telling the server what data type is being sent
                body: JSON.stringify(input) // converts the JS object into a JSON string, making it ready for HTTP transmission
            });

            // If there is a response, await for the data to be transferred
            if (response.ok) {
                const data = await response.json(); // .json turns the JSON string back into a JS object
                // if there is data within the response, redirect the user to the dashboard
                if (data) {
                    // Redirecting the user to the dashboard
                    window.location.href = "http://localhost:5173/dashboard";
                } else {
                    setError(true);
                    // if the user didn't input a password, set the error as true
                    if (data.password === null) {
                        setPasswordInputError(true);
                    }
                    // if the user didnt input an email, set the error as true
                    if (data.email === null) {
                        setEmailInputError(true);
                    }
                }
                // Saving the response data for later use / use across the program
                setSavedData(data);
            } else {
                setError(true);  // Mark input fields with an error
                // if the response is not ok, output the response status into the console
                console.log('Failed to send data', response.status);
            }
        } catch (err) {
            setError(true);  // Mark input fields with an error
            // If an error occurs, output the error into the console
            console.log('Error saving client', err)
        }
    }

    // write the explanation for this code
    // the input and set input are store 2 objects,
    // the handleChange function takes the new input from the input fields when there is presence,
    // and then overrides the value in the useState. event.target is the name of the input field and the value is the input
    const handleChange = (event) => {
        const { name, value } = event.target; // event.target refers to the input element
        // ...prev ensures any previous input states are retained
        // [name]: value dynamically updates the input object with the new value for the field that triggered the change event.

        // multiple input fields with different input accessing the same handler,
        // ...prev would retain those objects when the new input state is set

        // The line below calls setInput to change the value of input
        setInput((prev) => ({ ...prev, [name]: value })); // updates the input state object
    }

    return (
        // flex h-screen makes the parent section take up the full height of the screen and uses Flexbox to layout its children in a row
        <section className="flex h-screen">
            {/* Left side: Login Form */}
            {/* justify-centre items-centre This centres the content both horizontally and vertically inside the div */}
            {/* w-1/2 This makes each side take up 50% of the width of the screen */}
            <div className="flex justify-center items-center w-1/2 ">
                {/* The container is vertically centered in the screen */}
                {/* w-96 This fixes the width of the login form, so it doesn't stretch too wide */}
                <div className="text-center p-6 w-96">
                    <h1 className="pt-6 text-3xl font-bold">Logo</h1>
                    <h1 className="py-4 text-xl">Sign into ERP System</h1>
                    <div className="flex flex-col gap-4">
                        {/* Input fields - Temp, use the React input boxes */}
                        {/* focus:outline-none - Removes the default outline of focus */}
                        {/* focus:ring-2 - Adds a 2px ring around the input on focus */}
                        {/* focus:ring-indigo-500 - Changes the ring colour to indigo when the input is focused */}
                        {/* hover:border-indigo-500 - Changes the border colour to indigo when the input is hovered */}
                        <input type="text"
                               name="email"
                               value={input.email}
                               onChange={handleChange}
                               className={`border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 ${getEmailInputClass(emailInputError)}`}
                               placeholder="Email address"

                        />
                        <input type="password"
                               name="password"
                               value={input.password}
                               onChange={handleChange}
                               className={`border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 ${getPasswordInputClass(passwordInputError)}`}
                               placeholder="Password"

                        />
                    </div>
                    {/* SignIn and SignUp buttons */}
                    {/* space-x-4 - This adds space between each of the buttons in the row */}
                    <div className="py-6 space-x-4">
                        <button
                            className='bg-gray-700 text-white rounded-full shadow-2xl shadow-gray-500/50 px-6 py-3 hover:bg-indigo-700 transition-all'>
                            SignIn
                        </button>
                        <button
                            onClick={sendData}
                            className='bg-gray-700 text-white rounded-full shadow-2xl shadow-gray-500/50 px-6 py-3 hover:bg-indigo-700 transition-all'>
                            SignUp
                        </button>
                    </div>
                </div>
            </div>

            {/* Right side: Splash Text */}
            {/* justify-centre items-centre This centres the content both horizontally and vertically inside the div */}
            {/* w-1/2 This makes each side take up 50% of the width of the screen */}
            {/* bg-gradient-to-br from-gray-700 to-indigo-700 - This adds a colour gradient from the top left to the bottom right */}
            <div className="flex justify-center items-center w-1/2 bg-gradient-to-br from-gray-700 to-indigo-700">
                <h1 className="text-black">Splash Screen</h1>
            </div>
        </section>
    );
};


// Exporting the component so it can be called multiple times across the program
export default LoginFrom