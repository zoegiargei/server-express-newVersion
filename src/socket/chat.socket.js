import messageServices from '../services/messages.service.js'

export async function configMessagesSocket (io, socket) {
    socket.on('newUser', async name => {
        socket.broadcast.emit('newUser', name)
        console.log('Websocket conectado del lado del Servidor')
    })

    socket.on('newMessage', async data => {
        console.log(data)
        await messageServices.addMessage(data)
        const allMessages = await messageServices.getMessages()
        io.sockets.emit('messages', allMessages)
    })

    socket.on('refreshMessages', async () => {
        const allMessages = await messageServices.getMessages()
        io.sockets.emit('messages', allMessages)
    })
}
