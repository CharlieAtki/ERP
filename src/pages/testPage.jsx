// ExampleComponent.js
import React, { useEffect, useState } from 'react';

// This function calls the /test API, which returns the data from the documents,
// where the name attribute equals "Charlie Atkinson"
// This data is then used within the UI

const ExampleComponent = () => {
    const [data, setData] = useState([]); // State to hold the fetched data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error

    // Fetching the data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/test'); // Use HTTP here
                // if the response is not ok, throw a new error (error handling)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // defining the response value as the response (In JSON format)
                const result = await response.json();
                setData(result); // Set the fetched data
            } catch (err) {
                setError(err.message); // Set the error message in state
            } finally {
                setLoading(false); // Set loading to false regardless of outcome
            }
        };

        fetchData();
    }, []); // Run only once on mount

    if (loading) return <p>Loading...</p>; // Display loading state
    if (error) return <p>Error: {error}</p>; // Display error if any

    // Using the data fetched in the UI
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

export default ExampleComponent;


// PS refine my understanding of how the fetch request works.
