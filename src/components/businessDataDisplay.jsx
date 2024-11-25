const BusinessDataDisplay = () => {
    return (
        // the labels of the business information
        <section className="text-center p-6  border-2 border-gray-700 text-lg rounded-3xl hover:shadow-2xl transition-shadow duration-300">
            <label>Business Data</label>
            <div className="p-0">
                <table className="min-w-full border border-gray-200 bg-white rounded-lg overflow-hidden shadow-lg">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-300">
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Test</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Test</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Test</td>
                            <td className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Test</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Test</td>
                            <td className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Test</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default BusinessDataDisplay