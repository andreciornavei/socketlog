import { SERVER_URL, SERVER_PORT } from '@env'
import socketIOClient from "socket.io-client";

export default function () {

    const events = []
    let socket = undefined;
   
    return {
        connect: (jwt, onConnect, onDisconnect) => {
            try {
                socket = socketIOClient(`${SERVER_URL}:${SERVER_PORT}`, { query: { jwt: jwt } });
                onConnect(socket)
            } catch (error) {
                console.log("error connection", error)
            }
        },

        disconnect: () => {
            if (socket) {
                socket.disconnect()
            }
        },

        subscribe: (event, onEvent) => {
            if (socket && !events.includes(event)) {
                console.log("subscribed for", event, "event...")
                events.push(event)
                socket.on(event, onEvent)
            }
        },

        unsubscribe: (event) => {
            if (socket && events.includes(event)) {
                console.log("unsibscribed for", event, "event...")
                events.splice(events.indexOf(event), 1)
                socket.off(event, () => { })
            }
        }
    }
}