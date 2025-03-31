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
                                <div className="relative group">
                                    <img src={card.images.small} alt={card.name} className="w-full h-auto"/>
                                </div>
                                <h3>{card.name}</h3>
                            </li>
                        ))}
                </ul>
            </div>
        </>
    )
}