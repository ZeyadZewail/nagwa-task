import theme from "../../Constants/theme";

const Spinner = ({ size }: { size: number }) => (
	<div className="spinner" style={{ width: size, height: size, backgroundColor: theme.accent }} />
);

export default Spinner;
