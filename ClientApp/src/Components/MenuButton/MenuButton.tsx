import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface MenuButtonInterface {
	text: string;
	link: string;
}

const MenuButton: FC<MenuButtonInterface> = ({ text, link }) => {
	const navigate = useNavigate();

	const navigateToLink = () => {
		navigate(link.toLowerCase());
	};

	return (
		<button
			onClick={navigateToLink}
			className="bg-primary-button py-8  px-4 md:w-80 w-60 flex items-center justify-center rounded-xl">
			<p className="md:text-6xl text-4xl font-semibold text-primary">{text.toUpperCase()}</p>
		</button>
	);
};

export default MenuButton;
