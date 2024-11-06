const LoginFrom = () => {
    return (
        // flex h-screen makes the parent section take up the full height of the screen and uses Flexbox to layout its children in a row
        <section className="flex h-screen">
            {/* Left side: Login Form */}
            {/* justify-centre items-centre This centres the content both horizontally and vertically inside the div */}
            {/* w-1/2 This makes each side take up 50% of the width of the screen */}
            <div className="flex justify-center items-center w-1/2">
                {/* The container is vertically centered in the screen */}
                {/* w-96 This fixes the width of the login form, so it doesn't stretch too wide */}
                <div className="text-center p-6 w-96">
                    <h1 className="pt-4 text-2xl font-bold">Logo</h1>
                    <h1 className="py-4 text-lg">Sign into ERP System</h1>
                    <div className="flex flex-col gap-4">
                        {/* Input fields - Temp, use the React input boxes */}
                        {/* focus:outline-none - Removes the default outline of focus */}
                        {/* focus:ring-2 - Adds a 2px ring around the input on focus */}
                        {/* focus:ring-indigo-500 - Changes the ring colour to indigo when the input is focused */}
                        {/* hover:border-indigo-500 - Changes the border colour to indigo when the input is hovered */}
                        <input type="text"
                               className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500"
                               placeholder="Email address"
                        />
                        <input type="text"
                               className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500"
                               placeholder="Password"
                        />
                    </div>
                </div>
            </div>

            {/* Right side: Splash Text */}
            {/* justify-centre items-centre This centres the content both horizontally and vertically inside the div */}
            {/* w-1/2 This makes each side take up 50% of the width of the screen */}
            <div className="flex justify-center items-center w-1/2 bg-gray-700">
                <h1 className="text-black">Splash Screen</h1>
            </div>
        </section>
    );
};

export default LoginFrom