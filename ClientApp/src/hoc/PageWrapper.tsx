import theme from "../Constants/theme";

const PageWrapper = (Component: React.ComponentType) =>
	function HOC() {
		return (
			<div className="w-full min-h-screen flex flex-col flex-grow" style={{ backgroundColor: theme.secondary }}>
				{<Component />}
			</div>
		);
	};

export default PageWrapper;
