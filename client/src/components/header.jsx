import React from "react";

const Header = () => {
	return (
		<div className="w-full flex justify-between items-center min-h-20 px-8 bg-primary text-white mb-4">
			<a
				href="/cards"
				className="flex-1 text-lg uppercase text-center font-bold hover:underline hover:text-gray-300"
			>
				Cards list
			</a>
			<a
				href="/cards/create"
				className="flex-1 text-lg uppercase text-center font-bold hover:underline hover:text-gray-300"
			>
				Create a card
			</a>
			<a
				href="/cards/quizz"
				className="flex-1 text-lg uppercase text-center font-bold hover:underline hover:text-gray-300"
			>
				Quizz of the day
			</a>
		</div>
	);
};

export default Header;
