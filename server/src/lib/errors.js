errors = {
    CARD_NOT_FOUND: "CARD_NOT_FOUND",
    BODY_MALFORMED: "BODY_MALFORMED",
    CARD_DONE: "CARD_DONE",
    CARD_VALIDATOR: {
        CARD_REQUIRED: "Card is required and must be an object",
        ID_REQUIRED: "Card id is required and must be a positive number",
        CATEGORY_REQUIRED: "Card category is required and must be a string",
        QUESTION_REQUIRED: "Card question is required and must be a string",
        ANSWER_REQUIRED: "Card answer is required and must be a string",
        TAG_REQUIRED: "Card tag is required and must be a string",
    }
}

module.exports = errors;