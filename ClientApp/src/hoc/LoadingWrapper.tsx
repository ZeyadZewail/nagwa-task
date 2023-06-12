import { FC, PropsWithChildren } from "react";
import Loading from "../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";

interface LoadingInterface {
	loading: boolean;
	error: string;
	spinnerSize: number;
}

/* This is a functional component called `LoadingWrapper` that takes in props of type
`LoadingInterface` and `PropsWithChildren`. It conditionally renders either a loading spinner or an
error message with a "Go Back" button based on the `loading` and `error` props. If `loading` is
true, it renders the loading spinner with a size determined by the `spinnerSize` prop. If `error` is
truthy, it renders the error message and button. If `loading` is false, it renders the `children`
prop. The component also uses the `useNavigate` hook from `react-router-dom` to navigate back to the
home page when the "Go Back" button is clicked. */
const LoadingWrapper: FC<PropsWithChildren<LoadingInterface>> = ({ loading, error, spinnerSize, children }) => {
	const navigate = useNavigate();

	const backToHome = () => {
		navigate("/");
	};

	return loading ? (
		<div className="w-full min-h-screen flex items-center justify-center">
			{error ? (
				<div className="flex flex-col gap-6 items-center justify-center">
					<p className="md:text-6xl text-4xl">{error}</p>
					<button className="bg-primary-button w-fit py-4 px-4 rounded-xl" onClick={backToHome}>
						Go Back
					</button>
				</div>
			) : (
				<Loading size={spinnerSize} />
			)}
		</div>
	) : (
		<>{children}</>
	);
};

export default LoadingWrapper;
