const cardService = require("../../application/services/cardService");
const AnswerValidator = require("../../application/validators/AnswerValidator");

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
		const date = req.query.date ?? null;
		const quizz = cardService.getQuizz(date);
		res.json(quizz);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

function answerCard(req, res) {
	const cardId = req.params.cardId;
	const isValid = req.body.isValid;
	try {
		AnswerValidator.isAnswerValid(cardId, isValid);
		cardService.answerCard(cardId, isValid);
		res.status(204).json();
	} catch (error) {
		switch(error.message){
			case 'CARD_NOT_FOUND':
				res.status(404).json({ message: 'Card not found' });
				break;
			case 'BODY_MALFORMED':
				res.status(400).json({ message: 'Card Id and boolean isValid are required' });
				break;
			case 'CARD_DONE':
				res.status(400).json({ message: 'Cannot answer a done card' });
				break;
			default:
				res.status(500).json({ message: error.message });
		}
	}
}

module.exports = {
	getAllCards,
	addCard,
	getQuizz,
	answerCard,
};
