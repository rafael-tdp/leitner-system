const Card = require("../models/Card");
const cards = require("../../infrastructures/data/cardsData");
const generateId = require("../../utils/generateId");

const cardRepository = {
	addCard: function (card) {
		const newId = generateId();
		const newCard = new Card({ ...card, id: newId });
		cards.push(newCard);
		return newCard;
	},
	getCardById: function (cardId) {
		return cards.find((card) => card.id === cardId);
	},
	getAllCards: function (tags) {
		if (tags != null) {
			if(tags instanceof Array) {
				expectedCards = [];
				tags.forEach((tag) => {
					const cardsWithTag = cards.filter((card) => card.tag === tag);
					expectedCards.concat(cardsWithTag);
				});
				return expectedCards;
			}
			return cards.filter((card) => card.tag === tags);
		}
		return cards;
	},
	updateCard: function (card) {
		const cardIndex = cards.findIndex((c) => c.id === card.id);
		cards[cardIndex] = card;
		return card;
	},
};

module.exports = cardRepository;
