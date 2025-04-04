import { useEffect, useState } from "react"
import { getCards, getSets } from "../../api";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import CardsList from "./CardsList";

export default function Cards() {
    const { seriesQuery } = useParams();
    const [cards, setCards] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cardsData, setsData] = await Promise.all([getCards(), getSets()]);

                const filteredCardsBySeries = seriesQuery
                    ? cardsData.filter((card) => card.set.series === seriesQuery)
                    : cardsData;

                setCards(filteredCardsBySeries);

                const groupBySeries = setsData.reduce((acc, set) => {
                    if (!acc[set.series]) {
                        acc[set.series] = [];
                    }
                    acc[set.series].push(set);
                    return acc;
                }, {});

                setSeries(groupBySeries);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [seriesQuery]);

    if (cards.length === 0 && !seriesQuery)
        return <Loader />

    const handleSeriesChange = () => {
        setLoading(true);
    }

    return (
        <>
            <div className="container mx-auto py-8">
                <div className="flex justify-center">
                    <h1 className="text-4xl pb-2 font-bold mx-auto mb-10 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 inline-block text-transparent bg-clip-text ainmate-[gradient_3s_ease-in-out_infinite] bg-[length:200%_auto]">Trading Card Game</h1>
                </div>
                <div className="flex gap-4">
                    <Sidebar
                        seriesQuery={seriesQuery}
                        series={series}
                        onSeriesChange={handleSeriesChange}
                    />
                    <div className="w-full h-full">
                        <CardsList
                            cards={cards}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}