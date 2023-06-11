"use strict";

import express, { Express, Request, Response } from "express";
import cors from "cors";
import TestData from "./TestData.json";

const app: Express = express();
const port = 8080;
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

// helper function to select a random element from an array
const getRandomWord = (array: Array<any>) => {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
};

app.get("/words", (req: Request, res: Response) => {
	const wordList = TestData.wordList;
	// filter words by part of speech (pos)
	const adverbs = wordList.filter((word) => word.pos === "adverb");
	const verbs = wordList.filter((word) => word.pos === "verb");
	const nouns = wordList.filter((word) => word.pos === "noun");
	const adjectives = wordList.filter((word) => word.pos === "adjective");

	// select one random word from each part of speech
	const selectedWords = [getRandomWord(adverbs), getRandomWord(verbs), getRandomWord(nouns), getRandomWord(adjectives)];

	// select six more random words from the remaining words
	for (let i = 0; i < 6; i++) {
		const remainingWords = wordList.filter((word) => !selectedWords.includes(word));
		const randomWord = getRandomWord(remainingWords);
		selectedWords.push(randomWord);
	}

	// respond with OK and the word list
	res.status(200);
	res.send(selectedWords).end();
});

app.post("/rank", (req: Request, res: Response) => {
	const scoresList = TestData.scoresList;
	// deconstruct score from body and cast it as int
	const { int: score } = req.body;
	// init counter
	let lowerThanScoreCount = 0;

	// loop over scores array and update count
	for (let i = 0; i < scoresList.length; i++) {
		if (scoresList[i] < score) {
			lowerThanScoreCount += 1;
		}
	}

	// calculate rank percent
	let rankPercent = lowerThanScoreCount / scoresList.length;
	// round rank percent to nearest hundreth
	rankPercent = Math.ceil(rankPercent * 100) / 100;

	//respond with OK and the rank percent
	res.status(200);
	res.send(rankPercent).end();
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
