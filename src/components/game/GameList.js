import { Link, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const navigate = useNavigate()
    const [ games, setGames ] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

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
                        {/* <div className="game__type">Game type is {game.game_type}</div> */}

                    </section>
                })
            }
        </article>
        </>
    )
}