const Card = require("../models/Card");
const cards = require("../../infrastructures/data/cards.json");
const generateId = require("../../utils/generateId");
const CardValidator = require("../../application/validators/CardValidator");
const jsonUtils = require("../../utils/jsonUtils");

const PATH_TO_CARD_DATA = "./src/infrastructures/data/cards.json";

const cardRepository = {
	addCard: function (card) {
		const newId = generateId();
		const newCard = new Card({ ...card, id: newId });
		CardValidator.isCardValid(newCard);
		
		jsonUtils.writeFile(PATH_TO_CARD_DATA, [...cards, newCard]);

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
		jsonUtils.writeFile(PATH_TO_CARD_DATA, cards.map((c) => c.id === card.id ? card : c));
		return card;
	},
};

module.exports = cardRepository;
