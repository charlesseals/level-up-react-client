import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createGame, getGameTypes, getGames, UpdateGame, getSingleGame } from '../../managers/GameManager.js'


export const UpdateGameForm = () => {
    const navigate = useNavigate()
    const { gameId } = useParams()
    const [gameTypes, setGameTypes] = useState([])
    const [game, setUpdateGame] = useState({})

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
        skill_level: "",
        number_of_players: 0,
        title: "",
        designer: "",
        game_type: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        // fetch("http://localhost:8000/gametypes")
        getGameTypes()
            .then((types) => {
                setGameTypes(types)
            })    
    }, [])

    useEffect(() => {
        // TODO: Get the game types, then set the state
        // fetch("http://localhost:8000/gametypes")
        getSingleGame(gameId)
            .then((singleGame) => {
                singleGame.game_type = singleGame.game_type.id.toString()
                setCurrentGame(singleGame)
            })    
    }, [])


    // useEffect(() => {
    //     // TODO: Get the game types, then set the state
    //     // fetch("http://localhost:8000/gametypes")
    //     UpdateGame(gameId)
    //         .then((res) => {
    //             setUpdateGame(res)
    //         })    
    // }, [])



    const changeGameState = (domEvent) => {
        // console.log(domEvent.target)
        // TODO: Complete the onChange function
        let copy = {...currentGame, [domEvent.target.name] : domEvent.target.value
        }
        setCurrentGame(copy)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Existing Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        placeholder={currentGame.title}
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        placeholder={currentGame.designer}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="text" name="skill_level" required autoFocus className="form-control"
                        placeholder={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control"
                        placeholder={currentGame.number_of_players}
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
                    className="form-group" name="game_type">
                    <option value={0}>Select Game Type</option>
                    {gameTypes.map((types) => <option value={types.id}>{types.label}</option>)}
                </select>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        placeholder={currentGame.description}
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
                        number_of_players: currentGame.number_of_players,
                        skill_level: currentGame.skill_level,
                        game_type: parseInt(currentGame.game_type),
                        description: currentGame.description
                    }

                    // Send POST request to your API
                    UpdateGame(gameId, game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}