import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    // console.log(gameTypes)
    // let gamerToken = localStorage.getItem("lu_token")
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        // gamer_token: gamerToken,
        description: "",
        skillLevel: "",
        numberOfPlayers: 0,
        title: "",
        designer: "",
        gameTypeId: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        // fetch("http://localhost:8000/gametypes")
        getGameTypes()
            .then((types) => {
                setGameTypes(types)
            })    
    }, [])


    const changeGameState = (domEvent) => {
        // console.log(domEvent.target)
        // TODO: Complete the onChange function
        let copy = {...currentGame, [domEvent.target.name] : domEvent.target.value
        }
        setCurrentGame(copy)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        defaultValue={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        defaultValue={currentGame.designer}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="text" name="skillLevel" required autoFocus className="form-control"
                        defaultValue={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        defaultValue={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="game_type">Game Type: </label>
                    <input type="number" name="game_type" required autoFocus className="form-control"
                        value={currentGame.game_type}
                        onChange={changeGameState}
                    />
                </div> */}
                <select onChange={changeGameState} 
                    className="form-group" name="gameTypeId">
                    <option value={0}>Select Game Type</option>
                    {gameTypes.map((types) => <option value={types.id}>{types.label}</option>)}
                </select>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        defaultValue={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>


            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        designer: currentGame.designer,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: currentGame.skillLevel,
                        game_type: parseInt(currentGame.gameTypeId),
                        description: currentGame.description
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}