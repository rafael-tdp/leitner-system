const cardRepository = require("../../domain/repositories/cardRepository");
const categories = require("../../lib/categories");

const cardService = {
	addCard: function (card) {
		return cardRepository.addCard(card);
	},

	getCardById: function (cardId) {
		return cardRepository.getCardById(cardId);
	},

	getAllCards: function () {
		return cardRepository.getAllCards();
	},

	getQuizz: function () {
		const cards = cardRepository.getAllCards();
		const quizz = cards.map((card) => {
			if (this.needCardReview(card)) {
				return card;
			}
		});
		return quizz;
	},

	needCardReview: function (card) {
		const currentDate = new Date();
		return !card.nextReviewDate || card.nextReviewDate < currentDate;
	},

	isCorrectAnswer: function (card, answer) {
		return card.answer === answer;
	},

	checkCardExists: function (cardId) {
		const card = cardRepository.getCardById(cardId);
		if (!card) {
			throw new Error("Card not found");
		}
		return card;
	},

	getNextCategory: function (card) {
		const categoryIndex = categories.findIndex(
			(category) => category.value === card.category
		);
		const nextCategory = categories[categoryIndex + 1].value;
		return nextCategory;
	},

	calculateNextReviewDate: function (currentDate, categoryValue) {
		const frequency = categories.find(
			(category) => category.value === categoryValue
		).frequency;
		const nextReviewDate = new Date(currentDate);
		nextReviewDate.setDate(nextReviewDate.getDate() + frequency);
		return nextReviewDate;
	},

	processCorrectAnswer: function (cardId) {
		const currentDate = new Date();
		const card = this.checkCardExists(cardId);
		const nextCategoryValue = this.getNextCategory(card);
		card.nextReviewDate = this.calculateNextReviewDate(
			currentDate,
			nextCategoryValue
		);
		card.category = this.getNextCategory(card);
		return cardRepository.updateCard(card);
	},

	processIncorrectAnswer: function (cardId) {
		const card = this.checkCardExists(cardId);
		card.category = categories[0].value;
		card.nextReviewDate = new Date();
		return cardRepository.updateCard(card);
	},

	answerCard: function (cardId, answer) {
		const card = this.getCardById(cardId);
		if (this.isCorrectAnswer(card, answer)) {
			this.processCorrectAnswer(cardId);
			return { isValid: true };
		}
		this.processIncorrectAnswer(cardId);
		return { isValid: false };
	},
};

module.exports = cardService;