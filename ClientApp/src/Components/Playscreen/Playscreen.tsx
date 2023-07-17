import { Dispatch, FC, SetStateAction, useState } from "react";
import WordElement from "../../Types/WordElement";

const types = ["adverb", "verb", "noun", "adjective"];

interface PlayscreenInterface {
	score: number;
	setScore: Dispatch<SetStateAction<number>>;
	solvedCount: number;
	setSolvedCount: Dispatch<SetStateAction<number>>;
	wordsList: WordElement[];
}

const Playscreen: FC<PlayscreenInterface> = ({ score, setScore, solvedCount, setSolvedCount, wordsList }) => {
	const [history, setHistory] = useState<boolean[]>([]);

	/**
	 * The function "choose" checks if the input type matches a certain value and updates the score,
	 * history, and solved count accordingly.
	 * @param {string} type - The parameter `type` is a string that represents the user's choice for a
	 * particular game. It is compared with the `pos` property of an object in the `wordsList` array to
	 * determine if the user's choice is correct or not.
	 */
	const choose = (type: string) => {
		if (type == wordsList[solvedCount].pos) {
			setScore(score + 10);
			setHistory([...history, true]);
			setSolvedCount(solvedCount + 1);
		} else {
			setHistory([...history, false]);
			setSolvedCount(solvedCount + 1);
		}
	};

	/* `optionButtons` is a variable that contains an array of buttons, where each button represents a type
	of word (adverb, verb, noun, or adjective) that the user can choose from. The `map` function is used
	to iterate over the `types` array and create a button for each type. The `onClick` function of each
	button calls the `choose` function with the corresponding type as an argument. The `key` property is
	used to give each button a unique identifier, and the `className` property is used to apply styling
	to the button. The text inside each button is the type of word, and its size and color are
	determined by the CSS classes applied to it. */
	const optionButtons = types.map((type) => (
		<button
			onClick={() => {
				choose(type);
			}}
			key={type}
			className="bg-primary-button py-4  px-4 flex items-center justify-center rounded-xl">
			<p className="sm:text-6xl xs:text-5xl text-3xl font-semibold text-primary">{type}</p>
		</button>
	));

	return (
		<>
			<div className="w-full flex items-center justify-center">
				<div
					className=" border border-black rounded-xl md:mt-0 mt-20 flex p-4 justify-center items-center"
					style={{ aspectRatio: "2/1", backgroundColor: "#f9f9f9" }}>
					<p className="sm:text-6xl text-5xl ">{wordsList[solvedCount]?.word}</p>
				</div>
			</div>
			<p className="text-2xl self-center mt-2">{`${(solvedCount / 10) * 100}%`}</p>
			<div className="flex flex-col justify-center items-center mt-4 gap-4">
				<p className="text-xl h-7">
					{...history.map((con) => {
						if (con) {
							return "✔️";
						} else {
							return "❌";
						}
					})}
				</p>

				<p className="md:text-3xl text-xl ">Pick the right place of speech:</p>
			</div>

			<div className="grid grid-cols-2 grid-rows-2 sm:mx-auto mx-5 gap-5 my-10 justify-center items-center">
				{optionButtons}
			</div>
		</>
	);
};

export default Playscreen;
