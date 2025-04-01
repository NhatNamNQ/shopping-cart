import { useEffect, useState } from "react"
import { getCards } from "../../api"
import Loader from "../../components/Loader";

export default function Cards() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const data = await getCards();
                setCards(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCards();
    }, [])

    return (
        <>
            {loading && (
                <Loader />
            )}

            <div className="container mx-auto py-8 px-6">
                <div className="flex justify-center">
                    <h1 className="text-4xl pb-2 font-bold mx-auto mb-10 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 inline-block text-transparent bg-clip-text">Trading Card Game</h1>
                </div>
                <ul className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 gap-8">
                    {cards &&
                        cards.map(card => (
                            <li key={card.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl ">
                                <div className="relative aspect-[3/4]">
                                    <img src={card.images.small} alt={card.name} className="absolute inset-0 w-full h-full object-contain" />
                                </div>

                                {/* Card Info */}
                                <div className="px-2">
                                    <h3 className="text-xl font-bold mb-2 truncate mt-2">
                                        {card.name}
                                    </h3>
                                    <p className="font-medium">
                                        {card.cardmarket.prices.averageSellPrice}
                                    </p>

                                    {/* Add to Cart Button */}
                                    <button className="mt-4 mb-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                                        Add to Card
                                    </button>

                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </>
    )
}