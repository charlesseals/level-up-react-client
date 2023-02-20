import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent, getEvents } from '../../managers/EventManager.js'
import { getGames } from "../../managers/GameManager.js"


export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    // console.log(games)
    // let gamerToken = localStorage.getItem("lu_token")
    
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    
    // events.map(event => {
    //     let currentOrganizer = event.full_name
    // })

    const [currentEvent, setCurrentEvent] = useState({
        conName: "",
        location: "",
        organizer: 0,
        time: "",
        game: 0,
    })

    useEffect(() => {
        // TODO: Get the event types, then set the state
        // fetch("http://localhost:8000/games")
        getGames()
            .then((games) => {
                setGames(games)
            })    
    }, [])


    const changeEventState = (domEvent) => {
        // console.log(domEvent.target)
        // TODO: Complete the onChange function
        let copy = {...currentEvent, [domEvent.target.name] : domEvent.target.value
        }
        setCurrentEvent(copy)
    }


return (
    <form className="eventForm">
            <h2 className="eventForm__convention">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="convention">Convention Name: </label>
                    <input type="text" name="conName" required autoFocus className="form-control"
                        defaultValue={currentEvent.conName}
                        onChange={changeEventState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location: </label>
                    <input type="text" name="location" required autoFocus className="form-control"
                        defaultValue={currentEvent.location}
                        onChange={changeEventState}
                        />
                </div>
                <>
                {/* {
                    events.map(event => {
                        return <input key={`event--${event.id}`} className="event">
                            <div className="event__organizer"> Organizer {event.organizer.full_name}</div>
                        </input>
                    })
                } */}
                    {/* <div className="form-group">
                        <label htmlFor="organizer">Organizer: </label>
                        <input type="text" name="organizer" required autoFocus className="form-control"
                            value={
                                events.map(event => {
                                currentEvent.organizer = event.organizer.full_name
                                })
                            }
                            onChange={changeEventState}
                        />
                    </div> */}
                </>
                <div className="form-group">
                    <label htmlFor="time">Date and Time: </label>
                    <input type="datetime-local" name="time" required autoFocus className="form-control"
                        defaultValue={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
                <select onChange={changeEventState} 
                    className="form-group" name="game">
                    <option value={0}>Select Game</option>
                    {games.map((game) => { return <option value={game.id} >{game.title}</option>})}
                </select>


            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        organizer: currentEvent.organizer,
                        location: currentEvent.location,
                        time: currentEvent.time,
                        game: currentEvent.game,
                        con_name: currentEvent.conName,
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}