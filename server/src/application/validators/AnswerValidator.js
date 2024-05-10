
const errors = require('../../lib/errors');
const isAnswerValid = (cardId, answer) => {
    if (!cardId || !answer) {
        throw new Error(errors.BODY_MALFORMED);
    }
    return true;
}

module.exports = { isAnswerValid };
