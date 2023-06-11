import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import LeaderBoard from "./Pages/LeaderBoard";
import Loading from "./Components/Loading/Loading";
import Play from "./Pages/Play";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/play",
		element: <Play />,
	},
	{
		path: "/LeaderBoard",
		element: <LeaderBoard />,
	},
]);

function App() {
	return <RouterProvider router={router} fallbackElement={<Loading size={80} />} />;
}

export default App;
