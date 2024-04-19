const cardService = require("../../application/services/cardService");

function getAllCards(req, res) {
	try {
		const cards = cardService.getAllCards();
		res.json(cards);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

function getCardById(req, res) {
	const cardId = req.params.id;
	try {
		const card = cardService.getCardById(cardId);
		if (!card) {
			return res.status(404).json({ message: "Card not found" });
		}
		res.json(card);
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
		res.status(500).json({ message: error.message });
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
	const cardId = req.params.id;
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
	getCardById,
	addCard,
	getQuizz,
	answerCard,
};
