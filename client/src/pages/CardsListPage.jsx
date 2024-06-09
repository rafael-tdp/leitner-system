import { useEffect, useState } from "react";

const CardsListPage = () => {
	const [cards, setCards] = useState([]);
	const [tags, setTags] = useState([]);
	const [tagInput, setTagInput] = useState("");
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
			const query = tags.length > 0 ? `?tags=${tags.join("&tags=")}` : "";
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/cards${query}`,
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
	}, [tags]);
	const handleAddTag = () => {
        if (tagInput && !tags.includes(tagInput)) {
            setTags([...tags, tagInput]);
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };
	return (
		<div className="w-full p-4">
			<h1 className="title">Cards List</h1>
			<div className="mb-4">
			<div className="mb-4">
                {tags.map(tag => (
					<div className="inline-block p-2 bg-gray-200 text-gray-700 rounded-full cursor-pointer mr-2" onClick={() => handleRemoveTag(tag)} key={tag}>
						<span>
							{tag}
						</span>
						<svg className="inline-block ml-2" width="20px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M576 128c0-35.3-28.7-64-64-64H205.3c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7H512c35.3 0 64-28.7 64-64V128zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
					</div>
                ))}
            </div>
                <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag"
                    className="p-2 border border-gray-300 rounded"
                />
                <button
                    onClick={handleAddTag}
                    className="ml-2 p-2 bg-blue-500 text-white rounded"
                >
                    Add Tag
                </button>
            </div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
				{cards.length > 0 ? cards.map((card) => (
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
				)): <p>No cards found</p>}
			</div>
		</div>
	);
};

export default CardsListPage;
