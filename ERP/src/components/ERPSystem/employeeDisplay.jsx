import {useEffect, useState} from "react";

const EmployeeDisplay = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch(`${API_URL}/api/client/all-business-employees`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });

                if (!response.ok) {
                    console.error("Failed to fetch employees");
                    setError(true);
                }

                const data = await response.json();

                if (data.success) {
                    setEmployees(data.employees);
                } else {
                    console.error("Failed to fetch employees. Backend returned failure");
                    setError(true)
                }
            } catch (error) {
                console.error("Failed to fetch employees");
                setError(true);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div className="p-6 border-2 border-gray-700 rounded-2xl hover:shadow-2xl transition-shadow duration-300">
            <div>
                <div className="mb-4 grid col-span-1 text-left">
                    <label className="font-extrabold text-indigo-700 sm:text-xl md:text-2xl">Business Creation & Data Modification</label>
                    <label className="text-gray-700 sm:text-md md:text-lg">Where Business Employees Are Displayed</label>
                </div>
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 p-2">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee) => (
                            <tr key={employee._id} className="text-center">
                                <td className="border border-gray-300 p-2">{employee.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="border border-gray-300 p-2 text-center">
                                No Employees Found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeDisplay