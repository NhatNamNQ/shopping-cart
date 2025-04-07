import { useState, useEffect } from "react";

export function Cart({ onClose, cards, onDelete, onAdjust }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 0)
    }, [])

    const TRANSITION_DURATION = 300;
    const transitionClasses = `transition-all duration-${TRANSITION_DURATION}`;
    let classes = { cart: "", background: "" };
    if (isVisible) {
        classes.cart = "translate-x-0"
        classes.background = "bg-black/70 backdrop-blur-sm"
    } else {
        classes.cart = "translate-x-full"
    }


    function handleCloseTransition() {
        setIsVisible(false);
        setTimeout(() => {
            onClose()
        }, TRANSITION_DURATION);
    }

    return (
        <>
            <div className={`z-10 fixed right-0 bg-slate-100 w-full h-full max-w-xl overflow-y-auto py-10 px-10 ${transitionClasses} ${classes.cart}`}>
                <div className="flex items-center justify-between gap-6 py-4">
                    <span className="font-bold text-4xl">Shopping bag</span>
                    <span className="cursor-pointer" onClick={handleCloseTransition}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            fill="#000000"
                            className="w-10 h-10 pt-2"
                        >
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                    </span>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    <ul className="list-none">
                        {cards.map((card) => (
                            <li key={card.id} className="flex items-center gap-4 p-2">
                                <img src={card.images.large} alt={card.name} className="w-30 h-full object-contain flex-shrink-0 p-2 rounded-xl" />
                                <div className="flex flex-col overflow-hidden gap-2 flex-1">
                                    <p className="font-bold text-2xl truncate">{card.name} - {card.set.name}</p>
                                    <p className="font-medium">{card.cardmarket.prices.averageSellPrice}</p>
                                    <div className="flex gap-4 items-center">
                                        <button
                                            onClick={() => onAdjust(card.id, card.quantity, "decrement")}
                                            className="cursor-pointer font-bold text-2xl"
                                        >-
                                        </button>
                                        <span className="font-bold text-xl">{card.quantity}</span>
                                        <button
                                            onClick={() => onAdjust(card.id, card.quantity, "increment")}
                                            className="cursor-pointer font-bold text-2xl"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="mb-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300 cursor-pointer w-[25%] flex justify-center"
                                        onClick={() => onDelete(card.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="font-bold text-xl">
                    <span>Subtotal: $</span>
                    {cards.reduce((total, currentCard) => {
                        total += currentCard.quantity * currentCard.cardmarket.prices.averageSellPrice;
                        return total;
                    }, 0)}
                </div>
            </div>
            <div
                className={`fixed w-full h-full ${transitionClasses} ${classes.background}`}
                onClick={handleCloseTransition}
            ></div>
        </>
    )
}