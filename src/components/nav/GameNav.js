import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const GameNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/games">Games</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/events">Events</Link>
            </li>
            {/* <li className="navbar__item navbar_logout">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li> */}

            {
                localStorage.getItem("honey_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("lu_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

