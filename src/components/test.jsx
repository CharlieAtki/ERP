import React, { useState } from 'react';

function DynamicTable() {
  // Initial data
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', age: 28, occupation: 'Developer', test: '1' },
    { id: 2, name: 'Jane Smith', age: 34, occupation: 'Designer', test: '2' },
    { id: 3, name: 'Sam Green', age: 25, occupation: 'Analyst', test: '3' },
  ]);

  // State for input fields
  const [input, setInput] = useState({ name: '', age: '', occupation: '' });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.name && input.age && input.occupation) {
      setData((prevData) => [
        ...prevData,
        { id: prevData.length + 1, ...input, age: parseInt(input.age) },
      ]);
      setInput({ name: '', age: '', occupation: '' }); // Reset input fields
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <form onSubmit={handleSubmit} className="mb-4 w-full max-w-md">
        <div className="flex space-x-2">
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-1/3 p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            name="age"
            value={input.age}
            onChange={handleChange}
            placeholder="Age"
            className="w-1/3 p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="occupation"
            value={input.occupation}
            onChange={handleChange}
            placeholder="Occupation"
            className="w-1/3 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-2 w-full p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Add Person
        </button>
      </form>

      <table className="min-w-full border border-gray-200 bg-white rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Age
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Occupation
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              test
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((person, index) => (
            <tr
              key={person.id}
              className={`${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } hover:bg-gray-100`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {person.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {person.age}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {person.occupation}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {person.test}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicTable;
