import { Link, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { getEvents, DeleteEvent, leaveEvent, joinEvent } from "../../managers/EventManager.js"

export const EventList = (props) => {
    const navigate = useNavigate()
    const [ events, setEvents ] = useState([])
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [refresh])


    // const handleLeaveButton = (eventId) => {
    //     leaveEvent(eventId)
    //     .then(getEvents()).then(res => setEvents(res))
    // }
    
    
    // const handleSignUpButton = (eventId) => {
    //     joinEvent(eventId)
    //     getEvents().then(res => setEvents(res))
    // }
    const handleLeaveButton = (id) => {
        leaveEvent(id)
        // .then(() => {getEvents()})
        .then((res) => {setRefresh()})
        window.location.reload(true);
    }

    const handleSignUpButton = (id) => {
        joinEvent(id)
        // .then(() => {getEvents()})
        .then((res) => {setRefresh()})
        window.location.reload(true);
    }


    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                navigate({ pathname: "/events/new" })
            }}>Register New Event</button>

        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__name">{event.con_name} organized by {event.organizer.full_name}</div>
                        <div className="event__location">Event Location: {event.location} </div>
                        <div className="event__time">Date and Time: {event.time.replace('T', ' ').replace(':00Z', '')} </div>  
                        <button 
                            className="edit-game"
                            onClick={() => {
                                navigate({ pathname: `/events/${event.id}` })
                            }}>Edit Event
                        </button>
                        {/* 
                        Create a delete button that sends a delete request with a 204 status 

                        Update state with the updated list of events
                        */}
                        <button 
                            className="delete-game"
                            onClick={() => {
                                DeleteEvent(event.id)
                                getEvents().then(data => setEvents(data))
                                window.location.reload(true);
                            }}
                            >
                            Delete Button
                        </button>
                        {
                            event.joined ?
                            // TODO: create the Leave button
                            <button onClick={() => {
                                handleLeaveButton(event.id)
                                // setRefresh()
                            }}>Leave Event</button>
                            :
                            // TODO: create the Join button
                            <button onClick={() => {
                                handleSignUpButton(event.id)
                                // setRefresh()
                            }}>Join Event</button>

                        }
                                                

                    </section>
                })
            }
        </article>
        </>
    )
}