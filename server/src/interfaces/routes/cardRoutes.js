const express = require("express");
const cardController = require("../controllers/cardController");

const router = express.Router();

router.get("/", cardController.getAllCards);
router.post("/", cardController.addCard);
router.get("/quizz", cardController.getQuizz);
router.patch("/:cardId/answer", cardController.answerCard);

module.exports = router;
