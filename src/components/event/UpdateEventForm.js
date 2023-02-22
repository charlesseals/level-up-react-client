import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGames } from "../../managers/GameManager.js"
import { getSingleEvent, UpdateEvent, getEvents } from '../../managers/EventManager.js'


export const UpdateEventForm = () => {
    const { eventId } = useParams()
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const [events, setEvents] = useState([])

    // useEffect(() => {
    //     getEvents()
    //         .then((events) => {
    //             setEvents(events)
    //         })    
    // }, [])

    // const organizerId = (eventId) => {
    //     events.map(event => {
    //         if (event.id === eventId) {
    //             currentEvent.organizer = event.organizer.id
    //             return currentEvent.organizer
    //         }
    //     })
    // }


    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        con_name: "",
        location: "",
        organizer: 0,
        time: "",
        game: 0,
    })

    useEffect(() => {
        // TODO: Get the games, then set the state
        getGames()
            .then((games) => {
                setGames(games)
            })    
    }, [])


    useEffect(() => {
        // TODO: Get the event, then set the state
        getSingleEvent(eventId)
            .then((singleEvent) => {
                singleEvent.game = singleEvent.game.toString()
                setCurrentEvent(singleEvent)
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
                    <input type="text" name="con_name" required autoFocus className="form-control"
                        placeholder={currentEvent.con_name}
                        onChange={changeEventState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location: </label>
                    <input type="text" name="location" required autoFocus className="form-control"
                        placeholder={currentEvent.location}
                        onChange={changeEventState}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Date and Time: </label>
                    <input type="datetime-local" name="time" required autoFocus className="form-control"
                        placeholder={currentEvent.time}
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
                        location: currentEvent.location,
                        time: currentEvent.time,
                        game: parseInt(currentEvent.game),
                        con_name: currentEvent.con_name,
                    }

                    // Send POST request to your API
                    UpdateEvent(eventId, event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Submit Event Changes</button>
        </form>
    )
}