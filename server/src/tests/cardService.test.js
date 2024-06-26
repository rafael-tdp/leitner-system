const { it, before } = require("node:test");
const cardService = require("../application/services/cardService");
const cards = require("../infrastructures/data/cards.json");
const jsonUtils = require("../utils/jsonUtils");

jest.mock("../utils/jsonUtils", () => ({
	...jest.requireActual("../utils/jsonUtils"),
	writeFile: jest.fn(),
}));

beforeAll(() => {
	jsonUtils.writeFile.mockClear();
});

test("addCard", () => {
	it("should add a card", () => {
		const card = {
			question: "What is the capital of France?",
			answer: "Paris",
			tag: "Geography",
		};

		jsonUtils.writeFile([...cards, card]);
		cards.push(card);
		expect(cards[cards.length - 1]).toEqual(card);
	});
});

test("getAllCards", () => {
	it("should return all cards", () => {
		const allCards = cardService.getAllCards();
		expect(allCards).toEqual(cards);
	});

	it("should return all cards with a specific tag", () => {
		const tag = "Programming";
		const filteredCards = cardService.getAllCards(tag);
		const expectedCards = cards.filter((card) => card.tag === tag);
		expect(filteredCards).toEqual(expectedCards);
	});

	it("should return all cards with all tag specified", () => {
		const tags = ["Programming", "Geography"];
		const filteredCards = cardService.getAllCards(tags);
		let expectedCards = [];
		cards.forEach((card) => {
			if (tags.includes(card.tag)) {
				expectedCards.push(card);
			}
		});
		expect(filteredCards).toEqual(expectedCards);
	});

	it("should return an empty array if the card with tag does not exist", () => {
		const tag = "invalidTag";
		const filteredCards = cardService.getAllCards(tag);
		expect(filteredCards).toEqual([]);
	});
});


test("getQuizz", () => {
	it("should return a quizz", async () => {
		const currentDate = new Date();
		currentDate.setDate(currentDate.getDate());
		const cardForToday = {
			id: "1",
			question: "What is the capital of France?",
			answer: "Paris",
			tag: "Geography",
			category: "FIRST",
			nextReviewDate: currentDate.toISOString(),
		};

		jsonUtils.writeFile([...cards, cardForToday]);
		const quizz = await cardService.getQuizz();
		expect(quizz).toEqual(cards.slice(0, cards.length - 1));
	});
	
	it("should return a quizz without last element", async() => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
	
		const cardForAnotherDay = {
			id: "4",
			question: "What is the capital of Germany?",
			answer: "Berlin",
			tag: "Geography",
			category: "FIRST",
			nextReviewDate: tomorrow.toISOString(),
		};
		jsonUtils.writeFile([...cards, cardForAnotherDay]);
		const quizz = await cardService.getQuizz();
		expect(quizz).toEqual(cards.slice(0, cards.length - 1));
	});
});

test("needCardReview", () => {
	it("should return true if the card needs review", () => {
		const card = {
			nextReviewDate: new Date(),
		};
		const needReview = cardService.needCardReview(card);
		expect(needReview).toBe(true);
	});
	it("should return false if the card does not need review", () => {
		const currentDate = new Date();
		const card = {
			nextReviewDate: new Date(
				currentDate.setDate(currentDate.getDate() + 1)
			),
		};
		const needReview = cardService.needCardReview(card);
		expect(needReview).toBe(false);
	});
});

test("isCorrectAnswer", () => {
	it("should return true if the answer is correct", () => {
		const card = {
			answer: "Paris",
		};
		const answer = "Paris";
		const isCorrect = cardService.isCorrectAnswer(card, answer);
		expect(isCorrect).toBe(true);
	});
	it("should return false if the answer is incorrect", () => {
		const card = {
			answer: "Paris",
		};
		const answer = "London";
		const isCorrect = cardService.isCorrectAnswer(card, answer);
		expect(isCorrect).toBe(false);
	});
});

test("checkCardExists", () => {
	it("should return the card if exists", () => {
		const cardId = cards[0].id;
		const cardExists = cardService.checkCardExists(cardId);
		expect(cardExists).toBe(cards[0]);
	});
	it("should throw an error if the card does not exist", () => {
		const cardId = "invalidId";
		expect(() => {
			cardService.checkCardExists(cardId);
		}).toThrow("CARD_NOT_FOUND");
	});
});

test("getNextCategory", () => {
	it("should return the next category value", () => {
		const card = {
			category: "FIRST",
		};
		const nextCategory = cardService.getNextCategory(card);
		expect(nextCategory).toBe("SECOND");
	});
	it("should return the next category value", () => {
		const card = {
			category: "SECOND",
		};
		const nextCategory = cardService.getNextCategory(card);
		expect(nextCategory).toBe("THIRD");
	});
});

test("calculateNextReviewDate", () => {
	it("should return the next review date", () => {
		const currentDate = new Date();
		const categoryValue = "FIRST";
		const nextReviewDate = cardService.calculateNextReviewDate(
			currentDate,
			categoryValue
		);
		const expectedDate = new Date(currentDate);
		expectedDate.setDate(expectedDate.getDate() + 1);
		expect(nextReviewDate).toEqual(expectedDate);
	});
	it("should return the next review date", () => {
		const currentDate = new Date();
		const categoryValue = "SECOND";
		const nextReviewDate = cardService.calculateNextReviewDate(
			currentDate,
			categoryValue
		);
		const expectedDate = new Date(currentDate);
		expectedDate.setDate(expectedDate.getDate() + 2);
		expect(nextReviewDate).toEqual(expectedDate);
	});
});

test("processCorrectAnswer", () => {
	it("should update the card after success", () => {
		const currentDate = new Date();
		const card = {
			...cards[0],
			category: "FIRST",
			nextReviewDate: currentDate,
		};
		const updatedCard = cardService.processCorrectAnswer(card);
		expect(updatedCard.category).toBe("SECOND");
		expect(updatedCard.nextReviewDate).toEqual(
			new Date(currentDate.setDate(currentDate.getDate() + 2))
		);
	});
});

test("processIncorrectAnswer", () => {
	it("should update the card after failure", () => {
		const currentDate = new Date();
		const card = {
			...cards[0],
			category: "SECOND",
			nextReviewDate: currentDate,
		};
		const updatedCard = cardService.processIncorrectAnswer(card);
		expect(updatedCard.category).toBe("FIRST");
	});
});

test("answerCard", () => {
	it("should update category to FOURTH after success", () => {
		const card = cards[0];
		cardService.answerCard(card.id, true);
		expect(card.category).toBe("FOURTH");
	});
	it("should pass category to FIRST after failure", () => {
		const card = cards[0];
		cardService.answerCard(card.id, false);
		expect(card.category).toBe("FIRST");
	});
});
