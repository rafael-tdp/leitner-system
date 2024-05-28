import {
	FormControl,
	FormLabel,
	Input,
	Button,
	Box,
	FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const CardsCreatePage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		await fetch(import.meta.env.VITE_BACKEND_URL + "/cards", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then(() => {
				alert("Card created successfully");
				window.location.href = "/cards";
			})
			.catch((error) => {
				alert("Error creating card");
				window.location.href = "/cards";
				console.error(error);
			});
	};
	return (
		<div className="w-full p-4">
			<h1 className="title">Create a card</h1>
			<Box
				maxW="md"
				mx="auto"
				mt={5}
				p={5}
				borderWidth={1}
				borderRadius="lg"
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl isInvalid={errors.question} mb={4}>
						<FormLabel>Question</FormLabel>
						<Input
							type="text"
							placeholder="Enter your question"
							{...register("question", {
								required: "Question is required",
							})}
						/>
						<FormErrorMessage>
							{errors.question && errors.question.message}
						</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={errors.answer} mb={4}>
						<FormLabel>Answer</FormLabel>
						<Input
							type="text"
							placeholder="Enter your answer"
							{...register("answer", {
								required: "Answer is required",
							})}
						/>
						<FormErrorMessage>
							{errors.answer && errors.answer.message}
						</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={errors.tag} mb={4}>
						<FormLabel>Tag</FormLabel>
						<Input
							type="text"
							placeholder="Enter your tag"
							{...register("tag")}
						/>
						<FormErrorMessage>
							{errors.tag && errors.tag.message}
						</FormErrorMessage>
					</FormControl>

					<Button mt={4} colorScheme="blue" type="submit">
						Create
					</Button>
				</form>
			</Box>
		</div>
	);
};

export default CardsCreatePage;
