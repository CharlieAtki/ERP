import {useState} from "react";

const DateFilter = ({ onFilter}) => {
    const initialState = {
        startDate: "",
        endDate: "",
    };

    const [input, setInput] = useState(initialState);

    const handleChange = (event) => {
        const { name, value } = event.target; // name (name of the input field) - value (value in the input field)
        setInput((prev) => ({ ...prev, [name]: value })); // updating the useState, but keeping the value, which are unchanged
    }

    const handleFilter = () => {
        if (onFilter) {
            onFilter(input); // Pass the entire object (startDate and EndDate) to onFilter
        }
    };

    return (
        <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-2xl">
            <div className="flex flex-col">
                <label className="text-sm text-gray-700">
                    Start Date
                </label>
                <input
                    type="date"
                    name="startDate"
                    value={input.startDate}
                    onChange={handleChange}
                    className={'border border-gray-300 p-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 w-full bg-gray-100 placeholder-gray-500'}
                />
            </div>
            <div>
                <label className="text-sm text-gray-700">
                    End Date
                </label>
                <input
                    type="date"
                    name="endDate"
                    value={input.endDate}
                    onChange={handleChange}
                    className={'border border-gray-300 p-4 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 w-full bg-gray-100 placeholder-gray-500'}
                />
            </div>
            <button
                onClick={handleFilter}
                className='w-1/4 mt-6 bg-gray-700 text-white rounded-full shadow-2xl shadow-gray-500/50 px-6 py-3 hover:bg-indigo-700 transition-all transform hover:scale-105'>
                Filter
            </button>
        </div>
    );
};

export default DateFilter;