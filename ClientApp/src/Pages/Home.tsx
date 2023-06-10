/* eslint-disable react-refresh/only-export-components */
import PageWrapper from "../hoc/PageWrapper";
import logo from "../../assets/logo-color.svg";
import MenuButton from "../Components/MenuButton/MenuButton";

const Home = () => {
	return (
		<>
			<div className="flex items-center justify-center">
				<img className="xl:w-1/4 lg:w-1/3 md:w-1/2 " src={logo} />
			</div>
			<div className="w-full flex flex-col items-center mb-10 gap-10 flex-grow">
				<MenuButton text={"play"} link={"/play"} />
				<MenuButton text={"scores"} link={"/LeaderBoard"} />
			</div>
		</>
	);
};

export default PageWrapper(Home);
