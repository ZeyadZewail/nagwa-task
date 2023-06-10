const PageWrapper = (Component: React.ComponentType) =>
	function HOC() {
		return <div className="w-full min-h-screen flex flex-col">{<Component />}</div>;
	};

export default PageWrapper;
