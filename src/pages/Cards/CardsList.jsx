export default function CardsList({ cards, loading }) {

    const loadingStyles = loading && "opacity-30"

    return (
        <ul className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 gap-8">
            {cards.length ? (
                cards.map(card => (
                    <li key={card.id} className={`bg-white rounded-xl shadow-lg hover:shadow-xl ${loadingStyles}`}>
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
            )}
        </ul>

    )
}