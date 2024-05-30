const cardRepository = require("../../domain/repositories/cardRepository");
const categories = require("../../lib/categories");
const dateUtils = require("../../utils/dateUtils");
const errors = require("../../lib/errors");
const cardService = {
	addCard: function (card) {
		return cardRepository.addCard(card);
	},

	getAllCards: function (tags) {
		return cardRepository.getAllCards(tags);
	},

	getQuizz: function (date) {
		const cards = cardRepository.getAllCards();
		if (date != null) {
			const quizz = cards.map((card) => {
				if (dateUtils.isNextReviewToday(new Date(card.nextReviewDate), date)) {
					return card;
				}
			});
			
			return quizz;
		}
		const quizz = cards.map((card) => {
			if (this.needCardReview(card)) {
				return card;
			}
		});
		return quizz;
	},

	needCardReview: function (card) {
		return dateUtils.isNextReviewToday(new Date(card.nextReviewDate));
	},

	isCorrectAnswer: function (card, answer) {
		return card.answer === answer;
	},

	checkCardExists: function (cardId) {
		const card = cardRepository.getCardById(cardId);
		if (!card) {
			throw new Error(errors.CARD_NOT_FOUND);
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
		if(categoryValue === "DONE") return null;
		const frequency = categories.find(
			(category) => category.value === categoryValue
		).frequency;
		const nextReviewDate = new Date(currentDate);
		nextReviewDate.setDate(nextReviewDate.getDate() + frequency);
		return nextReviewDate;
	},

	processCorrectAnswer: function (card) {
		const currentDate = new Date();
		const nextCategoryValue = this.getNextCategory(card);
		card.nextReviewDate = this.calculateNextReviewDate(
			currentDate,
			nextCategoryValue
		);
		card.category = nextCategoryValue;
		return cardRepository.updateCard(card);
	},

	processIncorrectAnswer: function (card) {
		card.category = categories[0].value;
		const currentDate = new Date();
		card.nextReviewDate = this.calculateNextReviewDate(
			currentDate,
			"FIRST"
		);
		return cardRepository.updateCard(card);
	},
	answerCard: function (cardId, isValid) {
		const card = this.checkCardExists(cardId);
		if(card.category === "DONE") throw new Error(errors.CARD_DONE);
		isValid ? this.processCorrectAnswer(card) : this.processIncorrectAnswer(card);
	},
};

module.exports = cardService;
