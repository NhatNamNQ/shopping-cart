import { Link } from "react-router-dom"

export default function Sidebar({ seriesQuery, series, onSeriesChange }) {

    return (
        <div>
            <h1 className="font-bold text-2xl mb-4">Categories</h1>
            {
                seriesQuery && (
                    <Link
                        to='/cards'
                        className="text-sm font-medium text-[#EA3323] flex border-2 rounded-2xl items-center my-2"
                        onClick={onSeriesChange}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                        Clear Category
                    </Link>
                )
            }
            <ul>
                {series &&
                    Object.entries(series).map(([seriesName]) => (
                        <li key={seriesName} className="text-lg mb-1">
                            <Link to={`/cards/series/${seriesName}`} onClick={onSeriesChange}>
                                {seriesName}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}