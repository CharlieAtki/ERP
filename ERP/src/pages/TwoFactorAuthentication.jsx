import {useCallback, useEffect, useState} from "react";

// To do:

// Make the API to check if the 2FA code
// This page needs to know who is logged in to check the users account. Otherwise, I'd need to ask again.
// Implement error handling - user feedback if the code doesn't match is

// what I have done to implement 2FA:

// 1. Send Email algo complete - just need to pass the contents to the function to send the email (algo in utils folder)
// 2. UI for 2FA page
// 3. Adjustments to the redirection of the user - to the 2FA page rather than straight to the dashboard

// possible method to remember who is logged in:

// User Logs In:

// The server verifies the credentials.
// If valid, the server creates a session (using express-session or a similar library) and saves the user’s info.
// A session ID is sent to the client as a cookie.

// Server Manages State:
// The session is stored on the server (in memory, a database, or a store like Redis).

// Remember Logged-In User:
// On each request, the client sends the session cookie.
// The server retrieves the session data based on the cookie.

const TwoFactorAuthentication = () => {
    // The React useState is used to hold "remember" information, like what the user has typed.
    // This useSate sets up a simple state variable that can be directly updated.
    const [input, setInput] = useState({authenticationCode: ''}); // Input field state
    const [inputError, setInputError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [codeRequested, setCodeRequested] = useState(false);

    const API_URL = 'http://localhost:3000';
    const FRONTEND_URL = 'http://172.16.18.187:5137' // adjust to use the URL from the environment file

    const generate2FACode = useCallback(async () => {
        if (isLoading || codeRequested) return; // return the code below

        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:3000/api/auth/generate-2FA-code`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
            });

            if (response.ok) {
                const result = await response.json();
                setCodeRequested(true);
            }
        } catch (error) {
            console.error('Error generating 2FA code:', error)
        } finally {
            setIsLoading(false); // Once the API complete, inform the useSate that the process is complete
        }
    }, [isLoading, codeRequested]);



    const verify2FACode = async () => {
        setInputError(false); // reset the useState

        if (!input.authenticationCode) {
            setInputError(true);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/auth/verify-2FA-code`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ authenticationCode: input.authenticationCode }),
                credentials: 'include',
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    window.location.href = `${FRONTEND_URL}/dashboard`;
                } else {
                    setInputError(true) // an error has occurred
                }
            }
        } catch (error) {
            console.error('Error Verifying 2FA code:', error);
            setIsLoading(true);
        }
    };

    const handleResendCode = async () => {
        setCodeRequested(false)
        await generate2FACode();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    // Generates the code when the webpage is called
    useEffect(() => {
        if (!codeRequested) {
            generate2FACode();
        }

        return () => {
            // Cleaning up the useStates
            setCodeRequested(false);
            setInput({ authenticationCode: '' })
        };
    }, []);

    return (
        <section className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-indigo-700">
            <div
                className="flex justify-center items-center w-full max-w-md px-12 border-2 border-gray-700 p-4 text-lg rounded-3xl shadow-2xl bg-white">
                <div className="text-center p-6 w-full">
                    <h1 className="py-4 text-xl font-semibold text-gray-700">Authentication Code Input</h1>
                    <div className="flex flex-col gap-6">
                        <input type="password"
                               name="authenticationCode"
                               value={input.authenticationCode}
                               onChange={handleChange}
                               className={'border border-gray-300 p-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 w-full bg-gray-100 placeholder-gray-500'}
                               placeholder="Enter Code"
                        />
                        {inputError && (
                            <p className="text-red-500 text-sm">Please enter a valid authentication code</p>
                        )}
                    </div>
                    <div className="py-6 space-x-4 flex justify-center">
                        <button
                            onClick={verify2FACode}
                            disabled={isLoading}
                            className='bg-gray-700 text-white rounded-full shadow-2xl shadow-gray-500/50 px-8 py-3 hover:bg-indigo-700 transition-all transform hover:scale-105'>
                            Submit
                        </button>
                        <button
                            onClick={handleResendCode}
                            disabled={isLoading}
                            className='bg-gray-700 text-white rounded-full shadow-2xl shadow-gray-500/50 px-8 py-3 hover:bg-indigo-700 transition-all transform hover:scale-105'>
                            Resend
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TwoFactorAuthentication;