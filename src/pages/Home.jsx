import { NavLink } from "react-router-dom"

export default function Home() {
    return (
        <div>
            <section>
                <h1>Welcome to Southern Shop</h1>
            </section>
            <NavLink to='cards'>
                SEE CARD GALLERY
            </NavLink>
        </div>
    )
}