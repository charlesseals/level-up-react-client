import { Link, useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { getGames, DeleteGame } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const navigate = useNavigate()
    const [ games, setGames ] = useState([])
    const { gameId } = useParams()
    // const [deleteButton, setDeleteButton] = useState(false)

    // console.log(games)

    useEffect(() => {
        getGames()
        .then((res) => setGames(res))
    }, [])


    const handleDelete = (gameId) => {
        DeleteGame(gameId)
            getGames().then((res) => setGames(res))
            window.location.reload(true);
    }

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/games/new" })
            }}>Register New Game</button>
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__name">{game.title} Designed by {game.designer}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button
                            className="edit-game"
                            onClick={() => {
                                navigate({ pathname: `/games/${game.id}` })
                            }}>Edit Game
                        </button>
                        <button 
                            className="delete-game"
                            onClick={() => {
                                handleDelete(game.id)
                                // evt.preventDefault()
                                // DeleteGame(game.id)
                                // .then(() => navigate("/"))
                                // .then(() => navigate("/games"))

                                // const button = !deleteButton
                                // setDeleteButton(button)
                                // navigate({ pathname: `/games` })

                            }}>Delete Game
                        </button>

                        {/* <div className="game__type">Game type is {game.game_type}</div> */}

                    </section>
                })
            }
        </article>
        </>
    )
}