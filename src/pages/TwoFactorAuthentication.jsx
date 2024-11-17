import {useState} from "react";

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
    const [input, setInput] = useState({ authenticationCode: ''}); // Input field state
    const [inputError, setInputError] = useState(false);

    async function sendData(buttonType) {
        // Reset useStates before submitting
        setInputError(false);

        if (!input.authenticationCode) {
            setInputError(true); // sets the useState to true if empty - Allows for user feedback
        }

        // If there is no error, check the input code against the generated code
        if (!inputError) {
            // Searching for the client in the database with the matching email
            Client.findOneAndUpdate({name: input.email})
                .then((response) => {
                    if (response.ok) {
                        console.log(response)
                        // Check if the client authentication code (which was saved to their document) matches the input
                    }
                })

        }
    }
    // The handle change function takes the new input from the input field when there is presence,
    // and then overrides the value in the useState. event.target is the name of the input field and the value is the input
    const handleChange = (event) => {
        const { name, value } = event.target; // refers to the input element
        // Calls the setInput useState to change the value of the input
        setInput((prev) => ({ ...prev, [name]: value })); // updates the input state object
    }

    return (
        <section className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-indigo-700">
            <div className="flex justify-center items-center w-full max-w-md px-12 border-2 border-gray-700 p-8 text-lg rounded-3xl shadow-2xl bg-white">
                <div className="text-center p-6 w-full">
                    <h1 className="pt-6 text-3xl font-bold text-gray-800">Logo</h1>
                    <h1 className="py-4 text-xl font-semibold text-gray-700">Authentication Code Input</h1>
                    <div className="flex flex-col gap-6">
                        <input type="password"
                               name="2FA Code"
                               value={input.authenticationCode}
                               onChange={handleChange}
                               className={'border border-gray-300 p-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 w-full bg-gray-100 placeholder-gray-500'}
                               placeholder="Enter Code"
                        />
                    </div>
                    <div className="py-6 space-x-4 flex justify-center">
                        <button
                            onClick={() => sendData()}
                            className='bg-gray-700 text-white rounded-full shadow-2xl shadow-gray-500/50 px-8 py-3 hover:bg-indigo-700 transition-all transform hover:scale-105'>
                            Submit
                        </button>
                        <button
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