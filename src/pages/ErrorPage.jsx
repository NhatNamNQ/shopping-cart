import { useRouteError, useNavigate } from "react-router-dom"
export default function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <section className="p-10 text-white font-[Arvo] bg-neutral-800 h-screen">
            <div>
                <div className="bg-[url(https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnpkcmtsdXBxN3JkYjJ2MHoxNTNqMnJrOGI4aXNheHg0NnU1bXl0aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L1KQ5Wyuf4jEGW7KEU/giphy.gif)] h-[400px] bg-center w-[70%] bg-no-repeat bg-cover mx-auto mb-1 rounded-2xl">
                    <h1 className="text-center text-[70px] text-white">404</h1>
                </div>
                <h2 className="text-[30px] text-center">Look like you are lost</h2>
                <p className="text-center">{error.statusText || error.message}</p>
                <div className="flex justify-center mt-3">
                    <button
                        className="font-bold rounded-lg text-lg  w-48 h-16 bg-[#39ac31] text-[#fffefe] justify-center cursor-pointer "
                        onClick={() => navigate(-1)}
                    >Go home</button>
                </div>
            </div>
        </section>
    )
}