import theme from "../../Constants/theme";
import Spinner from "../Spinner/Spinner";
import "./Loading.css";

const Loading = ({ size }: { size: number }) => (
	<div className="w-full min-h-screen flex items-center justify-center" style={{ backgroundColor: theme.secondary }}>
		<Spinner size={size} />
	</div>
);

export default Loading;
