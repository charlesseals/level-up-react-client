import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { GameForm } from "../components/game/GameForm"
import { EventList } from "../components/event/EventList"
import { EventForm } from "../components/event/EventForm"
import { UpdateGameForm } from "../components/game/UpdateGameForm"
import { UpdateEventForm } from "../components/event/UpdateEventForm"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/games" element={<GameList />} />
            <Route path="/games/new" element={<GameForm />} />
            <Route path="/games/:gameId" element={<UpdateGameForm />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/events/new" element={<EventForm />} />
            <Route path="/events/:eventId" element={<UpdateEventForm />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<GameList />} />
            </Route>
        </Routes>
    </>
}