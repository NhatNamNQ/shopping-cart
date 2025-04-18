import { NavLink } from "react-router-dom"
import logoImage from "../assets/logo.svg"

export function Header({onOpenCart}) {
    return (
        <header className="border-b border-gray-200">
            <div className="container flex items-center max-w-screen justify-between p-4">
                <div>
                    <img src={logoImage} alt="logo" width={50} />
                </div>
                <ul className="flex gap-x-16 font-medium item-center">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="cards">Cards</NavLink>
                    <NavLink to="about">About</NavLink>
                    <NavLink to="contact">Contact</NavLink>

                    <li className="cursor-pointer" onClick={onOpenCart}>
                        <svg
                            className="fill-none stroke-black w-8 h-8"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                        >
                            <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </li>
                </ul>
            </div>
        </header>
    )
}
