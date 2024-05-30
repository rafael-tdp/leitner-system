
const errors = require('../../lib/errors');
const isAnswerValid = (cardId, isValid) => {
    if (!cardId || isValid === undefined) {
        throw new Error(errors.BODY_MALFORMED);
    }
    return true;
}

module.exports = { isAnswerValid };
