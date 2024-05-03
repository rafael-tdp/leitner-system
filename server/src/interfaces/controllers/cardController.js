const cardService = require("../../application/services/cardService");

function getAllCards(req, res) {
	try {
		const tags = req.query.tags ?? null;
		const cards = cardService.getAllCards(tags);
		res.json(cards);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

function addCard(req, res) {
	const newCard = req.body;
	try {
		const card = cardService.addCard(newCard);
		res.status(201).json(card);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

function getQuizz(req, res) {
	try {
		const quizz = cardService.getQuizz();
		res.json(quizz);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

function answerCard(req, res) {
	const cardId = req.params.cardId;
	const answer = req.body.answer;
	try {
		const card = cardService.answerCard(cardId, answer);
		res.json(card);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

module.exports = {
	getAllCards,
	addCard,
	getQuizz,
	answerCard,
};
