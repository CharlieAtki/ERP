// ExampleComponent.js
import React, { useEffect, useState } from 'react';

// This function calls the /test API, which returns the data from the documents,
// where the name attribute equals "Charlie Atkinson"
// This data is then used within the UI

const ExampleComponent = () => {
    // Initialising an empty array as the default state of data, which is where the fetched data will eventually be stored
    // This method ensures that the component can consistently handle any data fetched from the API.
    const [data, setData] = useState([]); // State to hold the fetched data
    // Initialising the loading state to true means that when the component first mounts, it will be in a "loading" state.
    // This is used to display a loading indicator, such as a spinner or message,
    // while the data is being fetched from an API or some other asynchronous operation is happening.
    const [loading, setLoading] = useState(true); // State to manage loading state
    // Used within React to manage errors during asynchronous operations like API requests.
    // This method improves the user experience by providing feedback on what went wrong and also keeps the UI responsive,
    // and clear by conditionally rendering error messages when necessary
    const [error, setError] = useState(null); // State to manage error

    // Fetching the data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // fetching from the api is asynchronous and therefore,
                // must declare "await" to ensure the program doesn't continue to run before the data is returned.
                const response = await fetch('http://localhost:3000/test'); // Use HTTP here
                // if the response is not ok, throw a new error (error handling)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // defining the response value as the response (In JSON format)
                const result = await response.json();
                setData(result); // Set the fetched data
                // waiting for an error to occur. If so, the error message is sent
            } catch (err) {
                setError(err.message); // Set the error message in state
            } finally {
                setLoading(false); // Set loading to false regardless of outcome
            }
        };

        fetchData();
    }, []); // Run only once on mount

    // Implements a loading screen until the data is fetched from the API
    // This incorporates user-feedback about fetch status into the application
    if (loading) return <p>Loading...</p>; // Display loading state
    // In the event of an error, display it on the users screen.
    // This ensures that the user is aware of any errors
    if (error) return <p>Error: {error}</p>; // Display error if any

    // Once the data has been fetched and there is no errors, the data is m
    // .map creates a new array by calling a function on every element of the original array and storing the results in a new array.
    // data.map(user => ...) iterates over each user object in the data array. - ... is used to input all parameters into the function.
    // Each user represents an object with properties like name, age, email, _id, createdAt, and updatedAt.

    // data.length > 0 is a ternary operator,
    // which checks for the return value of an expression and executes a block of code based on whether the value is truthy or falsy
    // If the value is truthy, the fetched data is displayed
    // If the value is Falsy, "No data available" is displayed.

    // new Date(user.createdAt).toLocaleString() converts the createdAt and updatedAt timestamps to a readable format.
    // .toLocaleString() is used to display the date and time in a format that respects the user's locale settings, making it more user-friendly.
    return (
        <div>
            <h1>Fetched Data</h1>
            {data.length > 0 ? (
                <ul>
                    {data.map(user => (
                        <li key={user._id}>
                            <strong>Name:</strong> {user.name} <br />
                            <strong>Age:</strong> {user.age} <br />
                            <strong>Email:</strong> {user.email} <br />
                            <strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()} <br />
                            <strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()} <br />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

// Exporting the function to allow it to be called across the whole codebase.
// For example, within "app.jsx", "testPage" will be called to allow for the URL to be routed.
// This ensures the page can be accessed via a ULR
export default ExampleComponent;