import theme from "../../Constants/theme";
import "./Loading.css";

const Loading = ({ size }: { size: number }) => (
	<div className="spinner" style={{ width: size, height: size, backgroundColor: theme.accent }}></div>
);

export default Loading;
