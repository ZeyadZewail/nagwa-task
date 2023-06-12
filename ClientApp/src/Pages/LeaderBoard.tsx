import { useState, useEffect } from "react";
import PlayerScore from "../Types/PlayerScore";
import PageWrapper from "../hoc/PageWrapper";
import Cookies from "js-cookie";
import LoadingWrapper from "../hoc/LoadingWrapper";
import { useNavigate } from "react-router-dom";

const LeaderBoard = () => {
	const [scores, setScores] = useState<PlayerScore[]>([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	/* This `useEffect` hook is used to fetch the leaderboard data from the browser's cookies and update
	the state variables `scores` and `loading`. It runs only once when the component mounts, as the
	second argument is an empty array `[]`. If there is a cookie named "LeaderBoard", it parses the
	cookie data and sets the `scores` state variable to the parsed data. Then it sets the `loading`
	state variable to `false` to indicate that the data has been loaded. */
	useEffect(() => {
		const cookie = Cookies.get("LeaderBoard");
		if (cookie) {
			setScores(JSON.parse(cookie));
		}
		setLoading(false);
	}, []);

	const navToHome = () => {
		navigate("/");
	};

	return (
		<LoadingWrapper loading={loading} error={""} spinnerSize={80}>
			<div className="my-auto mx-auto md:w-1/3 w-2/3 h-[80vh] flex flex-col gap-4">
				<p className="text-center text-4xl">Leaderboard</p>
				<div className="flex-grow ">
					<div className="w-full flex justify-end gap-4 text-xl py-2 px-4">
						<p>Score</p>
						<p>Rank</p>
					</div>
					<li className="max-h-[60vh] list-none flex flex-col gap-2 overflow-auto whitespace-nowrap no-scrollbar">
						{scores
							.sort((a, b) => b.score - a.score)
							.map((entry, index) => (
								<LeaderboardEntry entry={entry} index={index} />
							))}
					</li>
				</div>
				<div className="w-full flex items-center justify-center">
					<button className="py-2 px-4 bg-primary-button text-5xl rounded-3xl" onClick={navToHome}>
						Home
					</button>
				</div>
			</div>
		</LoadingWrapper>
	);
};

export default PageWrapper(LeaderBoard);

const LeaderboardEntry = ({ entry, index }: { entry: PlayerScore; index: number }) => {
	return (
		<ul className="w-full bg-accent rounded-3xl py-2 px-4 border-black flex justify-between " key={index}>
			<p className="text-2xl">{`${index + 1}. ${entry.name}`}</p>
			<div className="flex gap-4 text-xl">
				<p className="w-12 text-center">{entry.score}</p>
				<p className="w-12 text-end">{entry.rank}</p>
			</div>
		</ul>
	);
};
