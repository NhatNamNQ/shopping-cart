import { Link } from "react-router-dom"

export default function CardsList({ cards, loading }) {

    const loadingStyles = loading && "opacity-30"

    return (
        <ul className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 gap-8">
            {cards.length ? (
                cards.map(card => (
                    <Link to={`/cards/${card.id}`} key={card.id} >
                        <li className={`bg-white rounded-xl shadow-lg hover:shadow-xl ${loadingStyles}`}>
                            <div className="">
                                <img src={card.images.large} alt={card.name} className=" w-full h-full object-contain" />
                            </div>

                            {/* Card Info */}
                            <div className="px-2">
                                <h3 className="text-xl font-bold mb-2 truncate mt-2">
                                    {card.name}
                                </h3>
                                <p className="font-medium">
                                    {card.cardmarket.prices.averageSellPrice}
                                </p>

                            </div>
                        </li>
                    </Link>

                ))
            ) : (
                <div>This series doesn't have card</div>
            )}
        </ul>

    )
}