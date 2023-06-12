import { useEffect, useState } from "react";
import WordElement from "../Types/WordElement";
import Playscreen from "../Components/Playscreen/Playscreen";
import LoadingWrapper from "../hoc/LoadingWrapper";
import PageWrapper from "../hoc/PageWrapper";
import logo from "../../assets/logo-color.svg";
import PlayerScore from "../Types/PlayerScore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner/Spinner";

const api = import.meta.env.VITE_API ?? "";

const Play = () => {
	const [wordsList, setWordsList] = useState<WordElement[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [score, setScore] = useState(0);
	const [solvedCount, setSolvedCount] = useState(0);
	const [name, setName] = useState("");
	const [rank, setRank] = useState<number>(-1);

	const navigate = useNavigate();

	/* This `useEffect` hook is fetching a list of words from a server using a GET request to
	`http://localhost:8080/words`. It then updates the state with the response data using
	`setWordsList(responseData)` and sets `loading` to `false` using `setLoading(false)`. If there is
	an error with the request, it sets the `error` state to "Cannot Reach Server" using
	`setError("Cannot Reach Server")`. This effect runs only once, on component mount, because the
	dependency array `[]` is empty. */
	useEffect(() => {
		const getWords = async () => {
			try {
				const response = await fetch(`${api}/words`, { method: "GET" });
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

	/**
	 * This function sends a POST request to a server to retrieve the rank percentage based on a given
	 * score and updates the state accordingly.
	 */
	const getRank = async () => {
		try {
			const response = await fetch(`${api}/rank`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ score: score }),
			});
			const responseData = await response.json();
			const { rankPercent } = responseData;
			if (response.ok) {
				setRank(rankPercent);
			}
		} catch {
			setError("Cannot Reach Server");
		}
	};

	useEffect(() => {
		if (solvedCount == 10) {
			getRank();
		}
	}, [solvedCount]);

	/**
	 * The function saves a player's score and name to a leaderboard, with error handling for invalid
	 * inputs.
	 * @returns The function `saveScore` returns nothing (i.e., `undefined`). It performs some operations
	 * such as checking if the name is valid, creating a new player score object, and saving it to a
	 * leaderboard cookie, but it does not have a return statement. Instead, it navigates to the
	 * leaderboard page using the `navigate` function.
	 */
	const saveScore = (tryAgain: boolean) => {
		if (name === "") {
			setError("Please enter a name.");
			return;
		}

		if (name.length > 7) {
			setError("Name cannot be longer than 7 characters.");
			return;
		}

		const newScore: PlayerScore = { name: name, score: score, rank: rank };
		const oldCookie = Cookies.get("LeaderBoard");
		if (oldCookie) {
			let LeaderBoard: PlayerScore[] = JSON.parse(oldCookie);
			LeaderBoard = [...LeaderBoard, newScore];
			Cookies.set("LeaderBoard", JSON.stringify(LeaderBoard));
		} else {
			Cookies.set("LeaderBoard", JSON.stringify([newScore]));
		}

		tryAgain ? location.reload() : navigate("/leaderboard");
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
					<p className="md:text-6xl text-4xl text-center">{`You scored ${score}/100!`}</p>
					<div className="md:text-6xl text-4xl flex gap-6 h-fit items-center justify-center">
						Rank {rank === -1 ? <Spinner size={30} /> : `${rank}%`}
					</div>
					<p className="md:text-4xl text-2xl">Enter your name:</p>
					<div className="w-full flex flex-col">
						<p className="h-8 self-center text-red-600">{error ? error : null}</p>
						<div className="flex w-full flex-wrap items-center justify-center gap-4">
							<input
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
								className="lg:w-1/6  h-10 p-2 text-primary border-2 border-black rounded-md"
							/>
							<div className="flex items-center justify-center gap-4">
								<button onClick={() => saveScore(true)} className="rounded-md bg-primary-button py-2 px-2">
									Submit & Try again
								</button>
								<button onClick={() => saveScore(false)} className="rounded-md bg-primary-button py-2 px-2">
									Submit
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</LoadingWrapper>
	);
};

export default PageWrapper(Play);
