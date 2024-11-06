import Hero from '../components/Hero';
import NavigationBar from "../components/navigationBar.jsx";
import React from "react";
import AreaChartComponents from "../components/areaChart.jsx";
import LineChartComponent from "../components/lineChart.jsx";
import BarChartComponent from "../components/barChart.jsx";

// This "page" is where the different React "components" will be incorporated together
// "Hero" refers to function, which creates a banner.

// "space-y-8 p-4" is used to ensure the distance between each of the child elements is equal.
// "space-y-8" refers to the horizontal distance between each of the graphs,
// "p-4" refers to the padding on all side of the element

// The "flex space-x-4" utility class refers to the spacing and how items are managed
// "flex" is the class that applies to the display: flex style to the element. It makes the element a flex container,
// allowing its child elements (flex items) to be arranged in a row or column.
// Effect: When you use flex, the direct children of that element become flex items,
// which can be aligned, spaced, and distributed according to flexbox rules.
// "space-x-4" refers to the added horizontal spacing (margin) between child elements,
// that are flex items within a flex container.
// It creates a horizontal margin between each of the child elements within the container.
// As the row has multiple items, this class helps visually separate them.

// "w-1/3 h-[33vw]" is used to make the square graphs responsive.
// By setting equal dimensions on each div containing your chart,
// you ensure each ResponsiveContainer inside adapts to these square dimensions,
// making the graphs display as squares.

const Dashboard = () => {
    return (
        <>
            <div>
                <NavigationBar title={"Dashboard"} subtitle="Where Data is Visualised" />

                <div className="space-y-8 p-4">
                    {/* First row of charts */}
                    <div className="flex space-x-4">
                        <div className="w-1/3 h-[33vw]">
                            <AreaChartComponents />
                        </div>
                        <div className="w-1/3 h-[33vw]">
                            <LineChartComponent />
                        </div>
                        <div className="w-1/3 h-[33vw]">
                            <BarChartComponent />
                        </div>
                    </div>

                    {/* Second row of charts */}
                    <div className="flex space-x-4">
                        <div className="w-1/3 h-[33vw]">
                            <BarChartComponent />
                        </div>
                        <div className="w-1/3 h-[33vw]">
                            <LineChartComponent />
                        </div>
                        <div className="w-1/3 h-[33vw]">
                            <AreaChartComponents />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Dashboard;

// Things to add to this module:

// Within each graph component file, add the functionality to fetch data from the mongoDB database via an API.
// Reference server functionality has already been developed within the "server" JS file.
// Use this to develop the other APIs to allow the program to use CRUD operations.