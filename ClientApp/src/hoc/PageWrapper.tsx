import theme from "../Constants/theme";

/**
 * This is a Higher Order Component (HOC) that wraps a given React component in a div with a specific
 * style.
 * @param Component - The parameter `Component` is a React component that will be wrapped by the
 * higher-order component (HOC) returned by the `PageWrapper` function.
 * @returns A Higher Order Component (HOC) that wraps a given component with a div element that has a
 * specific class and style. The wrapped component is rendered inside the div element.
 */
const PageWrapper = (Component: React.ComponentType) =>
	function HOC() {
		return (
			<div className="w-full min-h-screen flex flex-col flex-grow" style={{ backgroundColor: theme.secondary }}>
				{<Component />}
			</div>
		);
	};

export default PageWrapper;
