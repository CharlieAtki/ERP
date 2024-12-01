import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ShopNavigationBar from "../../components/shop/shopNavigationBar.jsx";
import { ArrowRight } from "lucide-react"; // React Icons

const Shop = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('http://localhost:3000/', {
                    credentials: 'include',
                });
                const data = await response.json();

                if (!data.valid || (data.user && data.user.accessType !== 'Shop')) {
                    navigate('/customerAccountManagement');
                }
            } catch (error) {
                navigate('/customerAccountManagement');
            }
        };

        checkLoginStatus();
    }, [navigate]);

    const destinations = [
        {
            name: "Croatia",
            image: "/Croatia.jpg",
            description: "Explore the stunning national parks",
            highlights: ["Plitvice Lakes", "Dubrovnik", "Coastal Beauty"]
        },
        {
            name: "Singapore",
            image: "/Singapore.jpeg",
            description: "Discover urban wonders and cultural richness",
            highlights: ["Marina Bay Sands", "Gardens by the Bay", "Diverse Cuisine"]
        },
        {
            name: "Rome",
            image: "/Rome.jpg",
            description: "Immerse yourself in ancient wonders",
            highlights: ["Colosseum", "Vatican City", "Roman Forum"]
        },
        {
            name: "Bahamas",
            image: "/Bahamas.jpg",
            description: "Paradise beaches in the sun ",
            highlights: ["Pink Sands Beach", "Pig Beach", "CocoCay"]
        },
        {
            name: "Toronto",
            image: "/Toronto.jpg",
            description: "City Break",
            highlights: ["CN Tower", "High Park", "Toronto Islands"]
        }
    ];

    return (
        <div>
            <ShopNavigationBar title="Apprise Marketplace" subtitle="Holidays Made Simple"/>

            <div className="container mx-auto px-4 py-8">
                <div className="w-full mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Explore Destinations
                    </h2>

                    <div className="flex justify-center">
                        <div className="flex space-x-6 pb-6">
                            {destinations.map((destination, index) => (
                                <div
                                    key={destination.name}
                                    className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl group"
                                >
                                    <div className="relative">
                                        <img
                                            src={destination.image}
                                            alt={`Image of ${destination.name}`}
                                            className="w-full h-56 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                            {destination.name}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {destination.description}
                                        </p>

                                        <div className="mb-4">
                                            <h4 className="text-sm font-medium text-gray-500 mb-2">Highlights:</h4>
                                            <div className="flex space-x-2">
                                                {destination.highlights.map((highlight) => (
                                                    <span
                                                        key={highlight}
                                                        className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs"
                                                    >
                                                        {highlight}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            className="w-full flex items-center justify-center bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors group"
                                            onClick={() => {/* Navigate to destination details */}}
                                        >
                                            Explore Destination
                                            <ArrowRight
                                                className="ml-2 group-hover:translate-x-1 transition-transform"
                                                size={20}
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop