import { Link } from "react-router-dom"
export const NotFoundView = () => {
    return (
        <>
            <h1>404 NOT FOUND</h1>
            <Link to='/'>Volver al inicio</Link>
        </>
    )
}
