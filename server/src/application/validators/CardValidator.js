
const isCardValid = (card) => {
    if (!card || typeof card !== 'object') {
        throw new Error('Card is required and must be an object');
    }

    if (typeof card.id !== 'string') {
        throw new Error('Card id is required and must be a positive number');
    }

    if (typeof card.category !== 'string') {
        throw new Error('Card category is required and must be a string');
    };

    if (typeof card.question !== 'string') {
        throw new Error('Card question is required and must be a string');
    };

    if (typeof card.answer !== 'string') {
        throw new Error('Card answer is required and must be a string');
    };

    if (card.tag && typeof card.tag !== 'string') {
        throw new Error('Card tag is required and must be a string');
    };



    return true;
}

module.exports = { isCardValid };
