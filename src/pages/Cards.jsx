import { useEffect, useState } from "react"
import { getCards, getSets } from "../../api"
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Cards() {
    const { seriesQuery } = useParams();
    const [cards, setCards] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [cardsData, setsData] = await Promise.all([getCards(), getSets()]);
                console.log(seriesQuery)

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
                setSeriesLoading(false);
            }
        }

        fetchData();
    }, [seriesQuery]);

    return (
        <>
            {loading && (
                <Loader />
            )}


            {!loading && (
                <div className="container mx-auto py-8">

                    <div className="flex justify-center">
                        <h1 className="text-4xl pb-2 font-bold mx-auto mb-10 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 inline-block text-transparent bg-clip-text ainmate-[gradient_3s_ease-in-out_infinite] bg-[length:200%_auto]">Trading Card Game</h1>
                    </div>
                    <div className="flex gap-4">
                        {/* Sidebar */}
                        <div>
                            <h1 className="font-bold text-2xl">Categories</h1>
                            {
                                seriesQuery && (
                                    <Link to='/cards' className="text-sm font-medium text-[#EA3323] flex border-2 rounded-2xl items-center my-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                                        Clear Category
                                    </Link>
                                )
                            }
                            <ul>
                                {series &&
                                    Object.entries(series).map(([seriesName]) => (
                                        <li key={seriesName} className="text-lg">
                                            <Link to={`/cards/series/${seriesName}`}>
                                                {seriesName}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className="w-full h-full">
                            <ul className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 gap-8">
                                {cards.length ? (
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
                                    ))
                                ) : (
                                    <div>This series doesn't have card</div>
                                )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}