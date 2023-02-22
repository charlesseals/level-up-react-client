import { Link, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { getEvents, DeleteEvent } from "../../managers/EventManager.js"

export const EventList = (props) => {
    const navigate = useNavigate()
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])


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
                    </section>
                })
            }
        </article>
        </>
    )
}