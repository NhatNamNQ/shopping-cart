import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getCard } from "../api";

export default function SingleCard() {
    const { cardId } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cardData = await getCard(cardId);
                setData(cardData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [cardId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto py-8">
            {data && (
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
                    <div className="w-72 h-96 relative">
                        <img 
                            src={data.images.large} 
                            alt={data.name}
                            className="absolute inset-0 w-full h-full object-contain"
                        />
                    </div>
                    <div className="mt-4">
                        <p className="text-lg">Set: {data.set.name}</p>
                        <p className="text-lg">Series: {data.set.series}</p>
                        <p className="text-lg">Rarity: {data.rarity}</p>
                    </div>
                </div>
            )}
        </div>
    );
}