import { useState, useEffect } from "react";

export function Cart({ onClose }) {
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
            <div className={`z-10 fixed right-0 bg-slate-100 w-full h-full max-w-xl py-16 px-20 ${transitionClasses} ${classes.cart}`}>
                <div className="flex items-center justify-center gap-6 py-4">
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
            </div>
            <div
                className={`fixed w-full h-full ${transitionClasses} ${classes.background}`}
                onClick={handleCloseTransition}
            ></div>
        </>
    )
}