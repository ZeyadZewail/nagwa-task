import { FC, PropsWithChildren } from "react";
import Loading from "../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";

interface LoadingInterface {
	loading: boolean;
	error: string;
	spinnerSize: number;
}

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
