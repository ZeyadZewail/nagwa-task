import theme from "../../Constants/theme";
import "./Loading.css";

const Loading = ({ size }: { size: number }) => (
	<div className="w-full min-h-screen flex items-center justify-center" style={{ backgroundColor: theme.secondary }}>
		<div className="spinner" style={{ width: size, height: size, backgroundColor: theme.accent }} />
	</div>
);

export default Loading;
