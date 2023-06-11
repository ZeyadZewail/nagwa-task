import { useState, useEffect } from "react";
import PlayerScore from "../Types/PlayerScore";
import PageWrapper from "../hoc/PageWrapper";
import Cookies from "js-cookie";
import LoadingWrapper from "../hoc/LoadingWrapper";

const LeaderBoard = () => {
	const [scores, setScores] = useState<PlayerScore[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const cookie = Cookies.get("LeaderBoard");
		if (cookie) {
			setScores(JSON.parse(cookie));
		}
		setLoading(false);
	}, []);

	return (
		<LoadingWrapper loading={loading} error={""} spinnerSize={80}>
			{scores.map((entry, index) => (
				<div key={index}>{`${entry.name}: ${entry.score}`}</div>
			))}
		</LoadingWrapper>
	);
};

export default PageWrapper(LeaderBoard);
