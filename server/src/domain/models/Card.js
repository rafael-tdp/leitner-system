class Card {
	constructor({ id, question, answer, tag }) {
		this.id = id;
		this.question = question;
		this.answer = answer;
		this.tag = tag;
		this.category = "FIRST";
	}

	updateCategory(category) {
		this.category = category;
	}
}

module.exports = Card;
