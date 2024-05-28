import { useEffect, useState } from "react";

const CardsListPage = () => {
	const [cards, setCards] = useState([]);

	const categoriesNumber = {
		FIRST: {
			number: 1,
			backgroundColor: "bg-red-500",
		},
		SECOND: {
			number: 2,
			backgroundColor: "bg-blue-500",
		},
		THIRD: {
			number: 3,
			backgroundColor: "bg-green-500",
		},
		FOURTH: {
			number: 4,
			backgroundColor: "bg-yellow-500",
		},
		FIFTH: {
			number: 5,
			backgroundColor: "bg-purple-500",
		},
	};

	useEffect(() => {
		const fetchCards = async () => {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/cards`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.json();
			setCards(data);
		};
		fetchCards();
	}, []);
	return (
		<div className="w-full p-4">
			<h1 className="title">Cards List</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
				{cards.map((card) => (
					<div
						key={card.id}
						className="card p-4 bg-white shadow-md rounded-md flex flex-col justify-between items-center"
					>
						<div className="flex justify-between w-full">
							<div
								className={`flex items-center justify-center w-8 h-8 text-black rounded-full font-bold ${
									categoriesNumber[card.category]
										.backgroundColor
								}`}
							>
								{categoriesNumber[card.category].number}
							</div>
							<p className="text-sm text-gray-500 font-bold">
								{card.tag}
							</p>
						</div>
						<p className="text-xl font-bold mt-4">
							{card.question}
						</p>
						<p className="text-lg mt-4">{card.answer}</p>
						<p className="text-sm mt-4">
							Next review:{" "}
							{new Date(card.nextReviewDate).toDateString()}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default CardsListPage;
