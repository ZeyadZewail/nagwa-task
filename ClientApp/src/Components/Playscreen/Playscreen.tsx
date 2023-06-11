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

	const optionButtons = types.map((type) => (
		<button
			onClick={() => {
				choose(type);
			}}
			key={type}
			className="bg-primary-button py-8  px-4 flex items-center justify-center rounded-xl">
			<p className="md:text-6xl sm:text-4xl text-2xl font-semibold text-primary">{type}</p>
		</button>
	));

	return (
		<>
			<div className="w-full flex items-center justify-center">
				<div
					className=" border border-black rounded-xl md:mt-0 mt-20 md:w-1/4 w-2/3 flex p-4 justify-center items-center"
					style={{ aspectRatio: "2/1", backgroundColor: "#f9f9f9" }}>
					<p className="xl:text-6xl text-4xl ">{wordsList[solvedCount]?.word}</p>
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
