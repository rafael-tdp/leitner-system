const express = require("express");
const cardController = require("../controllers/cardController");

const router = express.Router();

router.get("/", cardController.getAllCards);
router.get("/quizz", cardController.getQuizz);
router.get("/:id", cardController.getCardById);
router.post("/", cardController.addCard);
router.patch("/:id/answer", cardController.answerCard);

module.exports = router;
