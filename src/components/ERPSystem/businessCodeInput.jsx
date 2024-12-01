import {useState} from "react";

const BusinessCodeInput = () => {
    // Initial State Object
    const initialState = {
        businessCode: ""
    }

    const [input, setInput] = useState(initialState); // Sate input fields (Business Code)
    const [businessCodeInputError, setBusinessCodeInputError] = useState(false); // State business code input field

    // handler used to update the values stored in the input useState
    // when there is an adjustment made in the input field.
    const handleChange = (event) => {
        const { name, value } = event.target; // name (name of the input field) - value (value in the input field)
        setInput((prev) => ({ ...prev, [name]: value })); // updating the useState, but keeping the value, which are unchanged
    }

    // Ternary operator to dynamically adjust the UI - turns the business code input field red when no data is input after an attempted submission
    const getBusinessCodeInputClass = (hasError) => {
            return hasError
            ? 'bg-gray-100 placeholder-gray-500 border-red-500'  // If there's an error, apply red border
            : 'bg-gray-100 placeholder-gray-500'; // If no error, apply default border

    };

    const sendData = async () => {
        // Reset error state
        setBusinessCodeInputError(false);

        // Validate input
        if (!input.businessCode) {
            setBusinessCodeInputError(true);
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/client/adjust-business-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({
                    businessCode: input.businessCode,
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Handle successful response (maybe show a success message)
                console.log(data.message);
                location.reload() // Refresh the page once the data has being modified
            } else {
                // Handle error response
                console.error("Error Updating the code");
            }
        } catch (error) {
            console.error("Client business code adjustment unsuccessful", error);
        }
    }

    return (
        <section className="text-center p-6 w-full border-2 border-gray-700 text-lg rounded-3xl hover:shadow-2xl transition-shadow duration-300">
            <div className="space-y-4">
                <div className="grid col-span-1 text-left">
                    <label className="font-extrabold text-indigo-700 sm:text-2xl md:text-2xl">Business Code Input</label>
                    <label className="text-gray-700 sm:text-md md:text-lg"> Where You Can Switch The Displayed Business</label>
                </div>
                <input
                    type="text"
                    name="businessCode"
                    value={input.businessCode}
                    onChange={handleChange}
                    placeholder="Business Code"
                    className={`border border-gray-300 p-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 w-full ${getBusinessCodeInputClass(businessCodeInputError)}`}
                />
                <button
                    onClick={sendData}
                    className='w-11/12 bg-gray-700 text-white rounded-full shadow-2xl shadow-gray-500/50 px-6 py-3 hover:bg-indigo-700 transition-all transform hover:scale-105'>
                    Submit
                </button>
            </div>
        </section>
    )
}

export default BusinessCodeInput