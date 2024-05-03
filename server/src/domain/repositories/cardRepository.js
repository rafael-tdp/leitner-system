const Card = require("../models/Card");
const cards = require("../../infrastructures/data/cards.json");
const generateId = require("../../utils/generateId");
const CardValidator = require("../../application/validators/CardValidator");
const jsonUtils = require("../../utils/jsonUtils");

const cardRepository = {
	addCard: function (card) {
		const newId = generateId();
		const newCard = new Card({ ...card, id: newId });
		CardValidator.isCardValid(newCard);
		
		jsonUtils.writeFile([...cards, newCard]);

		return newCard;
	},
	getCardById: function (cardId) {
		return cards.find((card) => card.id === cardId);
	},
	getAllCards: function (tags) {
		if (tags != null) {
			if(tags instanceof Array) {
				let expectedCards = [];
				tags.forEach((tag) => {
					const cardsWithTag = cards.filter((card) => card.tag === tag);
					expectedCards = expectedCards.concat(cardsWithTag);
				});
				return expectedCards;
			}
			return cards.filter((card) => card.tag === tags);
		}
		return cards;
	},
	updateCard: function (card) {
		jsonUtils.writeFile(cards.map((c) => c.id === card.id ? card : c));
		return card;
	},
};

module.exports = cardRepository;
