import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Box,
	Heading,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CardQuizzPage = () => {
	const [cards, setCards] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [quizDate, setQuizDate] = useState("");
	const [isTodayQuiz, setIsTodayQuiz] = useState(true);
	const [quizSelected, setQuizSelected] = useState(false);
	const [dateValidated, setDateValidated] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (quizSelected && (isTodayQuiz || dateValidated)) {
			const fetchCards = async () => {
				try {
					let url = `${import.meta.env.VITE_BACKEND_URL}/cards/quizz`;
					if (!isTodayQuiz && quizDate) {
						url += `?date=${quizDate}`;
					}

					const response = await fetch(url, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					});
					const data = await response.json();
					console.log(data);
					const dataFiltered = data.filter((card) => card !== null);
					setCards(dataFiltered);
				} catch (error) {
					alert("Erreur lors de la récupération des cartes");
					console.error(
						"Erreur lors de la récupération des cartes",
						error
					);
				}
			};

			fetchCards();
		}
	}, [quizSelected, isTodayQuiz, quizDate, dateValidated]);

	const onSubmit = async (data) => {
		const currentCard = cards[currentIndex];
		const answer = await (
			await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/cards/${
					currentCard.id
				}/answer`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			)
		).json();

		if (answer.isValid) {
			alert("Bonne réponse !");
			if (currentIndex < cards.length - 1) {
				setCurrentIndex(currentIndex + 1);
				reset();
			} else {
				alert("You have finished the quiz of the day !");
				window.location.href = "/cards";
			}
		} else {
			alert(
				"Wrong answer, the answer was : " +
					currentCard.answer +
					", u answered: " +
					data.answer
			);
			const result = confirm(
				"Voulez-vous quand même valider la réponse ?"
			);
			if (result) {
				await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/cards/${
						currentCard.id
					}/answer`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(currentCard),
					}
				);
			}
			if (currentIndex < cards.length - 1) {
				setCurrentIndex(currentIndex + 1);
				reset();
			} else {
				alert("You have finished the quiz of the day !");
				window.location.href = "/cards";
			}
		}
	};

	const handleTodayQuiz = () => {
		setIsTodayQuiz(true);
		setQuizSelected(true);
		setCurrentIndex(0);
		setCards([]);
	};

	const handleOtherDayQuiz = () => {
		setIsTodayQuiz(false);
		setQuizSelected(true);
		setDateValidated(false);
		setCurrentIndex(0);
		setCards([]);
	};

	const handleDateValidation = () => {
		setDateValidated(true);
	};

	const currentCard = cards[currentIndex];

	return (
		<div className="w-full p-4">
			<h1 className="title">Quizz</h1>
			<Box
				maxW="md"
				mx="auto"
				mt={5}
				p={5}
				borderWidth={1}
				borderRadius="lg"
			>
				{!quizSelected ? (
					<VStack spacing={4}>
						<Button colorScheme="blue" onClick={handleTodayQuiz}>
							Today's quizz
						</Button>
						<Button colorScheme="teal" onClick={handleOtherDayQuiz}>
							Quizz of another day
						</Button>
					</VStack>
				) : (
					<>
						{!isTodayQuiz && (
							<VStack spacing={4}>
								<FormControl mb={4}>
									<FormLabel>Quizz date</FormLabel>
									<Input
										type="date"
										value={quizDate}
										onChange={(e) =>
											setQuizDate(e.target.value)
										}
									/>
								</FormControl>
								<Button
									colorScheme="teal"
									onClick={handleDateValidation}
									className="mb-5"
								>
									Confirm date
								</Button>
							</VStack>
						)}
						{cards === null || cards === undefined ? (
							<Text>Loading</Text>
						) : cards.length > 0 ? (
							<>
								<form onSubmit={handleSubmit(onSubmit)}>
									<FormControl
										isInvalid={errors.answer}
										mb={4}
									>
										<FormLabel>
											{currentCard.question}
										</FormLabel>
										<Input
											type="text"
											placeholder="Enter your answer"
											{...register("answer", {
												required: "Answer is required",
											})}
										/>
										<FormErrorMessage>
											{errors.answer &&
												errors.answer.message}
										</FormErrorMessage>
									</FormControl>
									<Button
										mt={4}
										colorScheme="blue"
										type="submit"
									>
										Validate
									</Button>
								</form>
							</>
						) : (
							<Heading>
								No cards for this date, please select another
								date
							</Heading>
						)}
					</>
				)}
			</Box>
		</div>
	);
};

export default CardQuizzPage;
