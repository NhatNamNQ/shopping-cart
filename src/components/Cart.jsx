import { useState, useEffect } from "react";
import pikachuImage from "../assets/pikachuCartoon.png";
import { useCart } from "../context/CartContext";
import CardQuantity from "./CardQuantity";

export function Cart() {
    const [isVisible, setIsVisible] = useState(false);
    const {
        cartItems,
        removeItemFromCart,
        handleAdjustCardQuantity,
        toggleIsCartActive,
    } = useCart();

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

    const subTotal = cartItems.reduce((total, currentCard) => {
        total += currentCard.quantity * currentCard.cardmarket.prices.averageSellPrice;
        return total;
    }, 0).toFixed(2);


    function handleCloseTransition() {
        setIsVisible(false);
        setTimeout(() => {
            toggleIsCartActive();
        }, TRANSITION_DURATION);
    }

    return (
        <>
            <div className={`z-10 fixed right-0 bg-slate-100 flex flex-col w-full h-full max-w-xl overflow-y-auto px-15 ${transitionClasses} ${classes.cart}`}>
                {/* Shopping cart header section */}
                <section className="flex items-center justify-between gap-6 py-4 ">
                    <div className="items-center flex gap-4 ">
                        <span className="tracking-tighter text-3xl font-bold">Shopping bag</span>
                        <img src={pikachuImage} alt="Pikachu" className="w-15" />
                    </div>
                    <span className="cursor-pointer" onClick={handleCloseTransition}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            fill="#000000"
                            className="w-10 h-10 pt-2"
                        >
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                    </span>
                </section>

                {/* Shopping cart items list section */}
                <section className="mb-4">
                    <ul className="list-none flex flex-col gap-4">
                        {cartItems.map((card) => (
                            <li key={card.id} className="flex gap-6">
                                <img src={card.images.large} alt={card.name} className="w-30 h-full object-contain flex-shrink-0" />
                                <div className="flex flex-col overflow-hidden gap-2 flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xl tracking-wide truncate font-medium">{card.name} - {card.types}</p>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            height="24px"
                                            viewBox="0 -960 960 960"
                                            width="24px" fill="#000000"
                                            className="cursor-pointer hover:fill-red-600"
                                            onClick={() => removeItemFromCart(card.id)}
                                        >
                                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                        </svg>
                                    </div>

                                    {/* Card details section */}
                                    <div>
                                        <p className="">HP: {card.hp}</p>
                                        <p> Rarity: {card.rarity ? card.rarity : "None"}</p>
                                        <p className="">Series: {card.set.series}</p>
                                    </div>


                                    <div className="flex items-end text-xl justify-between flex-1">
                                        <p className="font-medium">${card.cardmarket.prices.averageSellPrice}</p>
                                        <CardQuantity
                                            quantity={card.quantity}
                                            onIncrement={() => handleAdjustCardQuantity(card.id, card.quantity, "increment")}
                                            onDecrement={() => handleAdjustCardQuantity(card.id, card.quantity, "decrement")}
                                        />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Subtotal and checkout section */}
                <section className="border-t pt-4 text-base mt-auto">
                    <div className="font-bold flex justify-between mb-6 text-xl">
                        <span>Subtotal: </span>
                        <span>${subTotal}</span>
                    </div>
                    <div className="flex justify-center mb-10">
                        <button className="uppercase border-2 font-bold py-4 px-8 rounded-full mb-4 cursor-pointer hover:bg-yellow-300 duration-200 border-black shadow-[7px_8px_0px_5px_black] w-full flex gap-2 justify-center">
                            <span>Checkout</span>
                            <span>
                                <svg
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                    />
                                </svg>
                            </span>
                        </button>
                    </div>
                </section>
            </div>
            <div
                className={`fixed w-full h-full ${transitionClasses} ${classes.background}`}
                onClick={handleCloseTransition}
            ></div>
        </>
    )
}