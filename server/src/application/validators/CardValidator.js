const errors = require('../../lib/errors');

const isCardValid = (card) => {
    if (!card || typeof card !== 'object') {
        throw new Error(errors.CARD_VALIDATOR.CARD_REQUIRED);
    }

    if (typeof card.id !== 'string') {
        throw new Error(errors.CARD_VALIDATOR.ID_REQUIRED);
    }

    if (typeof card.category !== 'string') {
        throw new Error(errors.CARD_VALIDATOR.CATEGORY_REQUIRED);
    };

    if (typeof card.question !== 'string') {
        throw new Error(errors.CARD_VALIDATOR.QUESTION_REQUIRED);
    };

    if (typeof card.answer !== 'string') {
        throw new Error(errors.CARD_VALIDATOR.ANSWER_REQUIRED);
    };

    if (card.tag && typeof card.tag !== 'string') {
        throw new Error(errors.CARD_VALIDATOR.TAG_REQUIRED);
    };

    return true;
}

module.exports = { isCardValid };
