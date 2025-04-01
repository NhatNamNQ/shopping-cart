import { useEffect, useState } from "react"
import { getCards } from "../../api"

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
                <div>Loading...</div>
            )}

            <div className="container mx-auto py-8 px-6">
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