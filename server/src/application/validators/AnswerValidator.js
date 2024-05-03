
const isAnswerValid = (cardId, answer) => {
    if (!cardId || !answer) {
        throw new Error('BODY_MALFORMED');
    }
    return true;
}

module.exports = { isAnswerValid };
