import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PlayScreen from "./Pages/PlayScreen";
import Home from "./Pages/Home";
import LeaderBoard from "./Pages/LeaderBoard";
import Loading from "./Components/Loading/Loading";
import theme from "./Constants/theme";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/play",
		element: <PlayScreen />,
	},
	{
		path: "/LeaderBoard",
		element: <LeaderBoard />,
	},
]);

function App() {
	return (
		<div
			className="w-full min-h-screen flex flex-col justify-center items-center"
			style={{ backgroundColor: theme.secondary }}>
			<RouterProvider router={router} fallbackElement={<Loading size={80} />} />
		</div>
	);
}

export default App;
