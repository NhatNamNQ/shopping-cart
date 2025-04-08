export default function CardQuantity({ quantity, onDecrement, onIncrement }) {
    return (
        <div className="flex gap-4 items-center">
            <button
                onClick={onIncrement}
                className="cursor-pointer stroke-slate-600 bg-slate-200 w-6 h-6 rounded-sm flex justify-center items-center p-1"
            >
                <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12h-15"
                    />
                </svg>
            </button>
            <span className="">{quantity}</span>
            <button
                onClick={onDecrement}
                className="cursor-pointer stroke-slate-600 bg-slate-200 w-6 h-6 rounded-sm flex justify-center items-center p-1"
            >
                <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            </button>
        </div>
    )
}