import { useEffect, useState } from "react";
import WordElement from "../Types/WordElement";
import Playscreen from "../Components/Playscreen/Playscreen";
import LoadingWrapper from "../hoc/LoadingWrapper";
import PageWrapper from "../hoc/PageWrapper";
import logo from "../../assets/logo-color.svg";
import PlayerScore from "../Types/PlayerScore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Play = () => {
	const [wordsList, setWordsList] = useState<WordElement[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [score, setScore] = useState(0);
	const [solvedCount, setSolvedCount] = useState(0);
	const [name, setName] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const getWords = async () => {
			try {
				const response = await fetch("http://localhost:8080/words", { method: "GET" });
				const responseData = await response.json();

				if (response.ok) {
					console.log(responseData);
					setWordsList(responseData);
					setLoading(false);
				}
			} catch {
				setError("Cannot Reach Server");
			}
		};

		getWords();
	}, []);

	const saveScore = () => {
		const newScore: PlayerScore = { name: name, score: score };
		const oldCookie = Cookies.get("LeaderBoard");
		if (oldCookie) {
			let LeaderBoard: PlayerScore[] = JSON.parse(oldCookie);
			LeaderBoard = [...LeaderBoard, newScore];
			Cookies.set("LeaderBoard", JSON.stringify(LeaderBoard));
		} else {
			Cookies.set("LeaderBoard", JSON.stringify([newScore]));
		}
		navigate("/leaderboard");
	};

	return (
		<LoadingWrapper loading={loading} spinnerSize={80} error={error}>
			<img className="lg:w-1/12 md:w-1/6 hidden md:block mt-5 ml-5" alt={logo} src={logo} />
			{solvedCount < 10 ? (
				<Playscreen
					score={score}
					setScore={setScore}
					solvedCount={solvedCount}
					setSolvedCount={setSolvedCount}
					wordsList={wordsList}
				/>
			) : (
				<div className="flex flex-col flex-grow justify-start items-center gap-10 mt-40">
					<p className="md:text-6xl text-4xl">{`You scored ${score * 10}/100!`}</p>
					<p className="md:text-4xl text-2xl">Enter your name:</p>
					<div className="flex w-full flex-wrap items-center justify-center">
						<input
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							className="md:w-1/6 mx-4 h-10 p-2 text-primary border-2 border-black rounded-md"
						/>
						<button onClick={saveScore} className="rounded-md bg-primary-button py-2 px-2">
							Submit Score
						</button>
					</div>
				</div>
			)}
		</LoadingWrapper>
	);
};

export default PageWrapper(Play);
